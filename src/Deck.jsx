import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck({ onDeckLoaded }) {
  const [deckOfCards, setDeckOfCards] = useState(null);

  useEffect(() => {
    async function fetchDeck() {
      try {
        const deckRes = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
        const deckID = deckRes.data.deck_id;
        setDeckOfCards(deckID);
        if (onDeckLoaded) {
          onDeckLoaded(deckID);
        }
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchDeck();
  }, []);

  return null;
}

export default Deck;
