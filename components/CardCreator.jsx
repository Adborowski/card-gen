"use client";
import React from "react";
import { useState } from "react";
import styles from "./CardCreator.module.css";
import { createCard } from "@/util/cardFunctions";
import IonIcon from "@reacticons/ionicons";
const CardCreator = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    createCard()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div className={styles.cardCreatorWrapper}>
      <button
        disabled={loading}
        onClick={handleClick}
        className={styles.btnCreateCard}
      >
        Create Card
      </button>
      {loading && (
        <div className={styles.iconWrapper}>
          <IonIcon name="hourglass-outline" size="large" />
        </div>
      )}
    </div>
  );
};

export default CardCreator;
