"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/utils/supabase";

interface CardType {
  id: number;
  question: string;
  answer: number;
  choices: {
    id: number;
    choice: string;
  }[];
}

interface DeckType {
  name: string;
  user_id?: string;
  cards?: CardType[];
}

interface DeckBuilderProps {
  userId: string;
}

export default function DeckBuilder({ userId }: DeckBuilderProps) {
  const [deck, setDeck] = useState<DeckType>();
  const [cardCount, setCardCount] = useState<number>(0);
  const [checked, setChecked] = useState<number>();
  const [cardQuestion, setCardQuestion] = useState<string>();
  const [cardChoice1, setCardChoice1] = useState<string>();
  const [cardChoice2, setCardChoice2] = useState<string>();
  const [cardChoice3, setCardChoice3] = useState<string>();
  const [cardChoice4, setCardChoice4] = useState<string>();
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    console.log("Updated deck:", deck);
    console.log("Updated cards:", cards);
  }, [deck, cards]);

  const handleCreateDeck = async () => {
    if (!deck) return;
    console.log("Creating deck:", deck);
    try {
      const { data, error } = await supabase.from("decks").insert([
        {
          name: deck.name,
          user_id: userId,
          cards: cards,
        },
      ]);

      if (error) {
        console.error("Error inserting new deck:", error);
      } else {
        console.log("New deck inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error inserting new deck:", error);
    }
  };

  const addCard = () => {
    if (!deck) return;

    if (
      !cardQuestion ||
      !cardChoice1 ||
      !cardChoice2 ||
      !cardChoice3 ||
      !cardChoice4 ||
      !checked
    )
      return;

    const newCard = {
      id: cardCount,
      question: cardQuestion,
      answer: checked,
      choices: [
        { id: 1, choice: cardChoice1 },
        { id: 2, choice: cardChoice2 },
        { id: 3, choice: cardChoice3 },
        { id: 4, choice: cardChoice4 },
      ],
    };

    // Use the functional form of setCards to ensure you're working with the latest state
    setCards((prevCards) => [...prevCards, newCard]);
    setCardCount((prevCardCount) => prevCardCount + 1);

    // Use the functional form of setDeck to ensure you're working with the latest state
    setDeck((prevDeck) => {
      if (!prevDeck || !prevDeck.cards) {
        // Handle the case where prevDeck or prevDeck.cards is undefined
        return { ...prevDeck, cards: [newCard] };
      }
      return { ...prevDeck, cards: [...prevDeck.cards, newCard] };
    });
  };

  return (
    <div>
      <h2 className="text-center text-2xl">Deck Builder</h2>
      <div className="space-y-2 mb-2">
        <Label className="text-lg" htmlFor="deckName">
          Deck Name
        </Label>
        <Input
          id="deckName"
          placeholder="Study Deck"
          onChange={(e) => setDeck({ name: e.target.value })}
        />
      </div>
      <h3 className="text-xl">Cards</h3>
      <p className="mb-4">
        Give each card a study question, and 4 possible choices. Then make sure
        to check the box next to the choice that contains the correct answer to
        the study quesiton.
      </p>
      <div className="space-y-2">
        <Card className="p-4 space-y-2">
          <div>
            <Label className="text-lg" htmlFor="cardQuestion">
              Study Question:
            </Label>
            <Input
              id="cardQuestion"
              placeholder="What is the capital of Texas?"
              onChange={(e) => setCardQuestion(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center">
              <Checkbox
                className="mr-2"
                id="choice1"
                checked={checked === 1}
                onCheckedChange={(checked) => {
                  setChecked(1);
                }}
              />
              <Label className="text-lg" htmlFor="choice1">
                Choice 1:
              </Label>
            </div>
            <Input
              id="choice1"
              placeholder="Austin"
              onChange={(e) => setCardChoice1(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center">
              <Checkbox
                className="mr-2"
                id="choice2"
                checked={checked === 2}
                onCheckedChange={(checked) => {
                  setChecked(2);
                }}
              />
              <Label className="text-lg" htmlFor="choice2">
                Choice 2:
              </Label>
            </div>
            <Input
              id="choice2"
              placeholder="Houston"
              onChange={(e) => setCardChoice2(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center">
              <Checkbox
                className="mr-2"
                id="choice3"
                checked={checked === 3}
                onCheckedChange={(checked) => {
                  setChecked(3);
                }}
              />
              <Label className="text-lg" htmlFor="choice3">
                Choice 3:
              </Label>
            </div>
            <Input
              id="choice3"
              placeholder="Dallas"
              onChange={(e) => setCardChoice3(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center">
              <Checkbox
                className="mr-2"
                id="choice4"
                checked={checked === 4}
                onCheckedChange={(checked) => {
                  setChecked(4);
                }}
              />
              <Label className="text-lg" htmlFor="choice4">
                Choice 4:
              </Label>
            </div>
            <Input
              id="choice4"
              placeholder="San Antonio"
              onChange={(e) => setCardChoice4(e.target.value)}
            />
          </div>
        </Card>
        <div className="flex w-full justify-between items-center">
          <Button onClick={() => addCard()}>Add Card</Button>
          <p>
            <strong>Card Count:</strong> {cardCount}
          </p>
          <Button onClick={() => handleCreateDeck()}>Finish Deck</Button>
        </div>
      </div>
    </div>
  );
}
