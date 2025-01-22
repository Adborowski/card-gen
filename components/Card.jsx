"use client";

import React from "react";
import styles from "./Card.module.css";
import Image from "next/image";
import IonIcon from "@reacticons/ionicons";

const Card = ({ cardData }) => {
  const exampleCard = {
    name: "Example Card",
    description: "Lorem Ipsum Solor Dit Amet",
    stats: {
      attack: 1000,
      defence: 1000,
    },
  };

  const { name, description, stats, image } = cardData ?? exampleCard;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imgWrapper}>
        <Image
          width={300}
          height={200}
          // fill={true}
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
