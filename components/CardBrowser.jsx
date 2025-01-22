"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getCards } from "@/util/databaseFunctions";
import styles from "./CardBrowser.module.css";
import Card from "@/components/Card";

const CardBrowser = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards().then((cardsData) => {
      setCards(Object.values(cardsData).reverse()); // newest to oldest (temporary)
    });
  }, []);

  useEffect(() => {
    console.log(cards.length + " cards");
  }, [cards]);

  if (!cards) {
    return <div>No cards</div>;
  }

  return (
    <div className={styles.cardBrowserWrapper}>
      {cards.map((cardData) => (
        <Card cardData={cardData} key={cardData.id} />
      ))}
    </div>
  );
};

export default CardBrowser;
