"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./CardBrowser.module.css";
import Card from "@/components/Card";
import { database } from "@/util/firebase";
import { ref, onValue } from "firebase/database";

const CardBrowser = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const cardsRef = ref(database, "cards/");
    onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(Object.values(data));
      setCards(Object.values(data));
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
