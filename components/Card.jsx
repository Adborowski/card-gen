"use client";

import React from "react";
import styles from "./Card.module.css";
import Image from "next/image";
import IonIcon from "@reacticons/ionicons";
import { deleteCard } from "@/util/databaseFunctions";

const Card = ({ cardData }) => {
  if (!cardData) {
    return <>no data</>;
  }

  const { name, description, stats, image, id, imageStyle } = cardData;

  const handleDelete = async () => {
    deleteCard(cardData);
  };

  const cardLevel = Math.floor((stats.attack + stats.defence) / 500);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.extras}>
        <span>Level {cardLevel}</span>
        <span>{imageStyle}</span>
        <span className={styles.btnDeleteCard} onClick={handleDelete}>
          Delete
        </span>
      </div>
      <div className={styles.imgWrapper}>
        <Image
          width={448}
          height={256}
          className={styles.cardImage}
          src={image ?? "/dummy.jpg"}
          alt="card image"
        />
      </div>

      <div className={styles.textWrapper}>
        <h2 className={styles.name}>
          <span>{name}</span>
        </h2>
        <div className={styles.description}>{description}</div>

        <div className={styles.stats}>
          <span className={`${styles.stat} ${styles.statAttack}`}>
            <div className={styles.iconWrapper}>
              <IonIcon name="eyedrop-outline" size="large" />
            </div>
            <div className={styles.statTextWrapper}>
              <span>{stats.attack}</span>
            </div>
          </span>
          <span className={`${styles.stat} ${styles.statDefence}`}>
            <div className={styles.iconWrapper}>
              <IonIcon name="shield-outline" size={"large"} />
            </div>
            <div className={styles.statTextWrapper}>
              <span>{stats.defence}</span>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
