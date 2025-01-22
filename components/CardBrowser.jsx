"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./CardBrowser.module.css";
import Card from "@/components/Card";
import { database } from "@/util/firebase";
import { ref, onValue } from "firebase/database";
import { getCardLevel } from "@/util/util";
import CardCreator from "@/components/CardCreator";
const CardBrowser = () => {
  const [cards, setCards] = useState([]);
  const [processedCards, setProcessedCards] = useState([]);
  const [viewedLevel, setViewedLevel] = useState(0);
  const [sortType, setSortType] = useState("creationDate");
  const [sortInversion, setSortInversion] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  if (!cards) {
    return <div>No cards</div>;
  }

  useEffect(() => {
    const cardsRef = ref(database, "cards/");
    onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      let allCards = Object.values(data);
      setCards(allCards);

      let processedCards = structuredClone(allCards);
      setProcessedCards(processedCards);
    });
  }, []);

  useEffect(() => {
    let processedCards = structuredClone(cards);

    processedCards = processedCards.filter((card) => {
      if (viewedLevel <= 0) {
        return card;
      }
      return getCardLevel(card.stats) >= viewedLevel;
    });

    if (searchTerm) {
      processedCards = processedCards.filter((card) => {
        if (
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          searchTerm.toLowerCase().includes(card.name.toLowerCase())
        ) {
          return card;
        }
      });
    }

    if (sortType == "creationDate") {
      processedCards = processedCards.sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );
    }

    if (sortType == "level") {
      processedCards = processedCards.sort((a, b) => {
        return getCardLevel(b.stats) - getCardLevel(a.stats);
      });
    }

    if (sortType == "attack") {
      processedCards = processedCards.sort((a, b) => {
        return b.stats.attack - a.stats.attack;
      });
    }

    if (sortType == "defence") {
      processedCards = processedCards.sort((a, b) => {
        return b.stats.defence - a.stats.defence;
      });
    }

    setProcessedCards(processedCards);
  }, [viewedLevel, sortType, searchTerm]);

  const handleSortClick = (key) => {
    if (key === sortType) {
      let reverse = structuredClone(processedCards).reverse();
      console.log(reverse[0].name);
      setProcessedCards(reverse);
      setSortInversion((sortInversion) => !sortInversion);
      return;
    } else {
      setSortInversion(false);
      setSortType(key);
    }
  };

  const Sorts = () => {
    const sorts = [
      {
        label: "Level",
        sortKey: "level",
      },
      { label: "Recent", sortKey: "creationDate" },
      { label: "ATK", sortKey: "attack" },
      { label: "DEF", sortKey: "defence" },
    ];
    return (
      <div className={styles.sortsWrapper}>
        <label>Sort by</label>
        {sorts.map((sort) => {
          const isActive = sortType === sort.sortKey;
          const isInverted = isActive && sortInversion;
          return (
            <button
              className={`${styles.btnSort} ${
                isActive ? styles.active : styles.inactive
              } ${isInverted ? styles.inverted : ""}`}
              key={sort.sortKey}
              onClick={() => {
                handleSortClick(sort.sortKey);
              }}
            >
              <span>{sort.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.cardBrowserWrapper}>
      <div className={styles.controls}>
        <div className={styles.controlItem}>
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            placeholder="Search"
          />
        </div>
        <div className={styles.controlItem}>
          <label htmlFor="inputLevel">
            <span>Min. Level</span>
          </label>
          <input
            id="inputLevel"
            min={0}
            max={20}
            onChange={(x) => {
              setViewedLevel(x.target.value);
            }}
            value={viewedLevel}
            type={"number"}
            placeholder={"View Level"}
          />
        </div>
        <div className={styles.controlItem}>
          <Sorts />
        </div>
        <div className={styles.controlItem}>
          <CardCreator />
        </div>
      </div>
      <div className={styles.cards}>
        {processedCards.map((cardData) => (
          <Card cardData={cardData} key={cardData.id} />
        ))}
      </div>
    </div>
  );
};

export default CardBrowser;
