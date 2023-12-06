"use client";

import DeckPreview from "./deckPreview";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PlusSquare } from "lucide-react";

interface DeckPreviewContainerProps {
  decks: {
    id: string;
    user_id: string;
    name: string;
    cards: {
      id: string;
      question: string;
      answer: number;
      choices: {
        id: string;
        choice: string;
      }[];
    }[];
  }[];
}

export default function DeckPreviewContainer({
  decks,
}: DeckPreviewContainerProps) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div>
      <div className="mb-4 flex justify-center space-x-4">
        <Link href="/decks/builder">
          <Button>
            <PlusSquare className="mr-2" /> Create New Deck
          </Button>
        </Link>
        <Button variant="secondary" onClick={() => setShowEdit(!showEdit)}>
          Edit My Decks
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3">
        {decks?.map((deck) => (
          <DeckPreview key={deck.id} deck={deck} showEdit={showEdit} />
        ))}
      </div>
    </div>
  );
}
