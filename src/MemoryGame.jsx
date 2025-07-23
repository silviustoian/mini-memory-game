import React, { useState } from "react";
import { useEffect } from "react";

export default function MemoryGame({ images }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const doubled = [...images, ...images];

    // Shuffle (simplu, fără lodash)
    const shuffled = doubled.sort(() => Math.random() - 0.5);

    const cardsArray = shuffled.map((img, index) => ({
      id: index + 1,
      image: img,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(cardsArray);
  }, []);
  return <div>{console.log(cards)}</div>;
}
