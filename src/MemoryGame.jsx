import React, { useState } from "react";
import { useEffect } from "react";

export default function MemoryGame({ images }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
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

  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);

    // Ignoră dacă deja e întoarsă sau găsită
    if (
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      flippedCards.length === 2
    )
      return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    setCards(newCards);
    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // Dacă sunt 2 cărți întoarse
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (first.image === second.image) {
        // Match!
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.image === first.image ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        // Nu e match – le întoarcem înapoi după 1 secundă
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mt-10">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="aspect-square bg-gray-300 flex items-center justify-center rounded cursor-pointer"
          >
            {card.isFlipped || card.isMatched ? (
              <img
                src={card.image}
                alt="card"
                className="object-cover w-full h-full rounded"
              />
            ) : (
              <div className="w-full h-full bg-gray-400 rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
