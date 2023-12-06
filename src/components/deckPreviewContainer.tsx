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

const PAGE_SIZE = 12;

export default function DeckPreviewContainer({
  decks,
}: DeckPreviewContainerProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedDecks = decks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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
        {paginatedDecks?.map((deck) => (
          <DeckPreview key={deck.id} deck={deck} showEdit={showEdit} />
        ))}
      </div>
      <div className="text-center mt-4">
        <p>Page</p>
        <div className="flex justify-center mt-2">
          {[...Array(Math.ceil(decks.length / PAGE_SIZE)).keys()].map(
            (page) => (
              <Button
                key={page + 1}
                onClick={() => setCurrentPage(page + 1)}
                variant="secondary"
                className={`mx-2 px-4 py-2 bg-secondary ${
                  currentPage === page + 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary"
                }`}
              >
                {page + 1}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
