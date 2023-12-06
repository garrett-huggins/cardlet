"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Delete } from "lucide-react";

interface CardType {
  id: number;
  question: string;
  answer: number;
  choices: {
    id: number;
    choice: string;
  }[];
}

interface BuilderCardProps {
  card: CardType;
  removeCard: (id: number) => void;
}

export default function BuilderCard({ card, removeCard }: BuilderCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Card className="relative">
      <Button
        className="absolute top-0 right-0 m-2 opacity-80"
        variant="destructive"
        onClick={() => removeCard(card.id)}
      >
        <Delete />
      </Button>
      <CardHeader className="text-lg">{card.question}</CardHeader>
      <CardContent>
        <ul>
          {card.choices.map(
            (choice) =>
              choice.choice && (
                <li
                  key={choice.id}
                  onClick={() => setSelected(choice.id)}
                  className="flex space-x-2 list-none rounded-lg p-2 "
                >
                  <p>{choice.id + 1}) </p>
                  <p>{choice.choice}</p>
                </li>
              )
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
