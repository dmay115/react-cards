import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Deck from "./Deck";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

function CardTable() {
  const [card, setCard] = useState(null);
  const [cardsRemaining, setCardsRemaining] = useState(52);
  const [deck, setDeck] = useState(null);

  function handleDeckLoaded(id) {
    setDeck(id);
  }

  async function drawCard() {

    try {
      const cardRes = await axios.get(`${BASE_URL}${deck}/draw/?count=1`);
      console.log("Card Response:", cardRes.data); 
      const cardData = cardRes.data.cards[0];
      const cardImg = cardData.image;
      const remaining = cardRes.data.remaining;

      setCard(cardImg);
      setCardsRemaining(remaining);
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  }

  async function shuffleDeck() {
    try {
        const shuffleRes = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
        const deckId = shuffleRes.data.deck_id;
        setDeck(deckId)
        setCardsRemaining(52)
        setCard(null)
    }   catch (error) {
        console.error("Error shuffling deck:", error)
    }
  }

  return (
    <div>
      <Deck onDeckLoaded={handleDeckLoaded} />
      <div>
        {card ? <Card imageSrc={card} /> : <p>No card drawn yet</p>}
      </div>
      <div>
        <button onClick={drawCard} disabled={!deck}>
          Draw Card
          </button>
        <button onClick={shuffleDeck} disabled={!deck || cardsRemaining === null || cardsRemaining === 52}>
          Shuffle Deck
        </button>
        </div>
      <div>
        Cards Remaining: {cardsRemaining !== null ? cardsRemaining : "N/A"}
      </div>
    </div>
  );
}

export default CardTable;
