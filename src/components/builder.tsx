"use client";

import { useState, useEffect } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/utils/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ListPlus } from "lucide-react";
import BuilderCard from "./builderCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deck, setDeck] = useState<DeckType>();
  const [checked, setChecked] = useState<number>();
  const [cardQuestion, setCardQuestion] = useState<string>();
  const [cards, setCards] = useState<CardType[]>([]);
  const [choices, setChoices] = useState<{ id: number; choice: string }[]>([
    { id: 0, choice: "" },
  ]);

  useEffect(() => {
    if (open) {
      console.log("Opening dialog");
      // reset state
      setDeck(undefined);
      setChecked(undefined);
      setCardQuestion(undefined);
      setCards([]);
      setChoices([{ id: 0, choice: "" }]);
    }
  }, [open]);

  const setChoice = (id: number, e: any) => {
    const updatedChoices = choices.map((choice) =>
      choice.id === id ? { ...choice, choice: e.target.value } : choice
    );

    // If the choice with id: 1 doesn't exist, add a new one
    if (!choices.some((choice) => choice.id === id)) {
      setChoices([...updatedChoices, { id: id, choice: e.target.value }]);
    } else {
      setChoices(updatedChoices);
    }
  };

  const handleCreateDeck = async () => {
    if (!deck) {
      alert("Please enter a deck name");
      return;
    }
    if (!cards.length) {
      alert("Please add some cards");
      return;
    }
    console.log("Creating deck:", deck);
    setLoading(true);
    try {
      const { data, error } = await supabase.from("decks").insert([
        {
          name: deck.name,
          user_id: userId,
          cards: cards,
        },
      ]);

      if (error) {
        setLoading(false);
      } else {
        setLoading(false);
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const addCard = () => {
    console.log("Adding card:", cardQuestion, choices, checked);
    if (!deck) {
      alert("Please enter a deck name");
      return;
    }

    if (!cardQuestion) {
      alert("Please enter a study question");
      return;
    }

    if (!choices) {
      alert("Please enter choices");
      return;
    }

    if (checked === undefined) {
      alert("Please select the correct answer");
      return;
    }

    // check if checked is on an empty choice
    if (choices[checked].choice === "") {
      alert("Please enter a choice for the correct answer");
      return;
    }

    const newCard = {
      id: cards.length,
      question: cardQuestion,
      answer: checked,
      choices: choices,
    };

    console.log("New card:", newCard);
    console.log("Choices:", choices);

    // Use the functional form of setCards to ensure you're working with the latest state
    setCards((prevCards) => [...prevCards, newCard]);

    // Use the functional form of setDeck to ensure you're working with the latest state
    setDeck((prevDeck) => {
      if (!prevDeck || !prevDeck.cards) {
        // Handle the case where prevDeck or prevDeck.cards is undefined
        return { ...prevDeck, cards: [newCard] };
      }
      return { ...prevDeck, cards: [...prevDeck.cards, newCard] };
    });
  };

  const removeCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const addChoice = () => {
    const newChoice = { id: choices.length, choice: "" };
    setChoices([...choices, newChoice]);
  };

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>
              Your new deck has been created!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Close
            </AlertDialogCancel>
            <Link href="/decks">
              <AlertDialogAction>View Decks</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h2 className="text-center text-2xl mb-2">Deck Builder</h2>
      <Card className="space-y-2 mb-4 p-4">
        <Label className="text-lg" htmlFor="deckName">
          Deck Name
        </Label>
        <Input
          value={deck?.name || ""}
          disabled={loading}
          id="deckName"
          placeholder="Study Deck"
          onChange={(e) => setDeck({ name: e.target.value })}
        />
      </Card>
      <h3 className="text-xl">Cards</h3>
      <Accordion collapsible className="flex" type="single">
        <AccordionItem value="instructions">
          <AccordionTrigger className="text-muted-foreground justify-start py-0">
            Instructions
          </AccordionTrigger>
          <AccordionContent className="">
            Give each card a study question, and 4 possible choices. Then make
            sure to check the box next to the choice that contains the correct
            answer to the study quesiton. Once you{"'"}ve added all of your
            cards, click the {'"'}Finish Deck{'"'} button to save your deck,
            then it
            {"'"}s time to study!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="space-y-2">
        <Card className="p-4 space-y-2">
          <div>
            <Label className="text-lg" htmlFor="cardQuestion">
              Study Question:
            </Label>
            <Input
              value={cardQuestion || ""}
              disabled={loading}
              id="cardQuestion"
              placeholder="What is the capital of Texas?"
              onChange={(e) => setCardQuestion(e.target.value)}
            />
          </div>
          {choices.map((choice) => (
            <ChoiceInput
              loading={loading}
              key={choice.id}
              id={choice.id}
              placeholder={`Choice ${choice.id + 1}`}
              onChange={setChoice}
              checked={checked}
              setChecked={setChecked}
              choices={choices}
            />
          ))}
          <CardFooter className="p-0 pt-1">
            <Button variant="outline" onClick={() => addChoice()}>
              <ListPlus className="mr-2" size={20} /> Add Choice
            </Button>
          </CardFooter>
        </Card>
        <div className="flex w-full justify-between items-center">
          <Button variant="secondary" onClick={() => addCard()}>
            Add Card
          </Button>
          <p>
            <strong>Card Count:</strong> {cards.length}
          </p>
          <Button disabled={loading} onClick={() => handleCreateDeck()}>
            Finish Deck
          </Button>
        </div>
        <hr />
        <h3 className="text-xl font-medium text-center">Deck Preview</h3>
        {cards.length === 0 && (
          <p className="text-center">
            Start adding cards to see a preview of your deck.
          </p>
        )}
        <div className="space-y-4">
          {
            // map over cards
            cards.map((card) => (
              <BuilderCard key={card.id} card={card} removeCard={removeCard} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

const ChoiceInput = ({
  id,
  placeholder,
  onChange,
  checked,
  setChecked,
  loading,
  choices,
}: {
  id: number;
  placeholder: string;
  onChange: (idx: number, e: any) => void;
  checked: number | undefined;
  setChecked: (idx: number) => void;
  loading: boolean;
  choices: { id: number; choice: string }[];
}) => (
  <div>
    <div className="flex items-center">
      <Checkbox
        disabled={loading}
        className="mr-2"
        id="choice4"
        checked={checked === id}
        onCheckedChange={(checked) => {
          setChecked(id);
        }}
      />
      <Label className="text-lg" htmlFor="choice4">
        Choice {id + 1}:
      </Label>
    </div>
    <Input
      value={choices.find((choice) => choice.id === id)?.choice || ""}
      onChange={(e) => onChange(id, e)}
      disabled={loading}
      id={`choice${id}`}
      placeholder={placeholder}
    />
  </div>
);
