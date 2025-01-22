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

  const { name, description, stats, image, id } = cardData;

  const handleDelete = async () => {
    deleteCard(id);
  };

  return (
    <div className={styles.cardWrapper}>
      <button className={styles.btnDeleteCard} onClick={handleDelete}>
        {" "}
        Delete
      </button>
      <div className={styles.imgWrapper}>
        <Image
          width={300}
          height={200}
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
