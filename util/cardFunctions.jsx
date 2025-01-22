"use server";

import { getDatabase, ref as dbRef, set } from "firebase/database";
import { adjectives, nouns } from "./words";
import { roll } from "@/util/util";
import OpenAI from "openai";
import { v4 } from "uuid";
import { storeImage } from "@/util/storageFunctions";
import { firebase } from "@/util/firebase";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const db = getDatabase(firebase);

const getCardName = () => {
  const adjective = roll(adjectives);
  const cardGender = adjective.gender; // for PL language purposes
  const noun = roll(nouns, [{ gender: cardGender }]);
  return `${adjective.word} ${noun.word}`;
};

const getCardDescription = async (cardName) => {
  const description = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a fantasy writer. Your job is to create short descriptions for playing cards. Max 200 characters. You work with an input that is a name in Polish, and your description should be in Polish and should fit the name. The next message is the name of the card. Do not repeat the name of the card in the description. The name of the card is ${cardName}`,
      },
    ],
    store: true,
  });

  return description.choices[0].message.content;
};

const getIllustrationStyle = () => {
  const availableStyles = [
    "fantasy book style",
    "realistic style",
    "cave drawing style",
    "comic book style",
  ];
  const result = roll(availableStyles);
  console.log("rolled style:", result);
  return roll(availableStyles);
};

const getCardImage = async (cardName, cardDescription, cardId) => {
  let url;

  const prompt = `You are a professional illustrator. You will receive a prompt in Polish with a name. Illustrate the name. Use style - ${getIllustrationStyle()}. Use a landscape background. Fill the whole frame. Your prompt name is ${cardName}.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1792x1024",
  });

  url = response.data[0].url;

  let chickenMode = false; // instead of a slow call to openai, just quickly fetch an img of a chicken [dev only]
  url = chickenMode
    ? `https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg`
    : url;

  const blob = await fetch(url).then((r) => r.blob());
  const filename = `${cardId}.png`;
  const creationDate = new Date().toLocaleDateString();

  const metadata = {
    cardId: cardId,
    cardName: cardName,
    creationDate: creationDate,
    imagePrompt: prompt,
  };

  return storeImage(blob, filename, metadata);
};

const getCardStats = () => {
  const stats = {
    attack: Math.floor(Math.random() * 30 + 1) * 100,
    defence: Math.floor(Math.random() * 30 + 1) * 100,
  };
  return stats;
};

export const createCard = async () => {
  const id = v4();
  const name = getCardName();
  const description = await getCardDescription(name);
  const image = await getCardImage(name, description, id);
  const newCard = {
    id: id,
    name: name,
    description: description,
    image: image,
    stats: getCardStats(),
    creationDate: creationDate,
  };

  set(dbRef(db, "cards/" + id), newCard);

  console.log(newCard);
  return newCard;
};
