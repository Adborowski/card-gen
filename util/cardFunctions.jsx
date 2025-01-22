"use server";

import { getDatabase, ref as dbRef, set } from "firebase/database";
import { adjectives, nouns, properNouns, gerundVerbs } from "./words";
import { roll } from "@/util/util";
import OpenAI from "openai";
import { v4 } from "uuid";
import { storeImage } from "@/util/storageFunctions";
import { firebase } from "@/util/firebase";
import { getCardLevel } from "@/util/util";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const db = getDatabase(firebase);

const getCardName = () => {
  const nameModels = [
    `${roll(nouns).word} of the ${roll(nouns).word}`, // noun of the noun
    `${roll(adjectives).word} ${roll(nouns).word}`, // nouny noun
    `${roll(adjectives).word} ${roll(nouns).word} of ${roll(properNouns).word}`, // nouny noun of Nouna
    `${roll(gerundVerbs).word} ${roll(adjectives).word} ${roll(nouns).word}`, // nouning nouny noun
    `The ${roll(gerundVerbs).word} ${roll(nouns).word}`, // the verbing noun
  ];

  const cardName = roll(nameModels);

  return cardName;
};

const getCardDescription = async (cardName) => {
  const description = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a fantasy writer. Your job is to create short descriptions for playing cards. Max 200 characters. Do not make a list. Do not repeat the name of the card in the description. The name of the card is ${cardName}.`,
      },
    ],
    store: true,
  });

  return description.choices[0].message.content;
};

const getArtStyle = () => {
  const styles = [
    "Impressionism",
    "Expressionism",
    "Pointillism",
    "Cubism",
    "Realism",
  ];

  const result = roll(styles);
  return result;
};

const getCardImage = async (cardName, cardDescription, cardId) => {
  let url;

  const imgStyle = getArtStyle();
  const prompt = `You are a professional visual artist. You know all the art in the world. Create an artwork which depicts a ${cardName}. Use this description: ${cardDescription}. Use this style: ${imgStyle} Fill the whole frame. No typography.`;

  console.log(cardName.toUpperCase() + ` (${imgStyle})`);
  console.log(cardDescription);

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  url = response.data[0].url;

  let chickenMode = false; // instead of a slow call to openai, just quickly fetch an img of a chicken [dev only]
  url = chickenMode
    ? `https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg`
    : url;

  const blob = await fetch(url).then((r) => r.blob());
  const filename = `${cardId}.png`;

  const metadata = {
    cardId: cardId,
    cardName: cardName,
    imagePrompt: prompt,
    imageStyle: imgStyle,
  };

  return {
    imageUrl: await storeImage(blob, filename, metadata),
    imagePrompt: prompt,
    imageStyle: imgStyle,
  };
};

const getCardStats = () => {
  const stats = {
    attack: Math.floor(Math.random() * 30 + 1) * 100,
    defence: Math.floor(Math.random() * 30 + 1) * 100,
  };
  return stats;
};

export const createCard = async () => {
  const creationDate = new Date().toUTCString();
  const id = v4();
  const name = getCardName();
  const stats = getCardStats();
  const description = await getCardDescription(name);
  const image = await getCardImage(name, description, id);

  const newCard = {
    id: id,
    name: name,
    description: description,
    image: image.imageUrl,
    imagePrompt: image.imagePrompt,
    imageStyle: image.imageStyle,
    stats: stats,
    level: getCardLevel(stats),
    creationDate: creationDate,
  };

  set(dbRef(db, "cards/" + id), newCard);

  console.log(newCard);
  return newCard;
};
