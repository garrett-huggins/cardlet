"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

interface CardType {
  id: string;
  question: string;
  answer: number;
  choices: {
    id: number;
    choice: string;
  }[];
}

export default function QuestionCard({ card }: { card: CardType }) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Card>
      <CardHeader className="text-lg">{card.question}</CardHeader>
      <CardContent>
        <ul>
          {card.choices.map((choice) => (
            <li
              onClick={() => setSelected(choice.id)}
              key={choice.id}
              className="flex space-x-2 list-none hover:bg-primary hover:text-primary-foreground rounded-lg p-2 hover:cursor-pointer"
            >
              <p>{choice.id}) </p>
              <p>{choice.choice}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="border mx-4"></div>
      <CardFooter className="pt-2">
        {selected ? (
          <p className="text-center">
            {selected === card.answer ? "Correct!" : "Incorrect!"}
          </p>
        ) : (
          <p className="text-center">Select an answer</p>
        )}
      </CardFooter>
    </Card>
  );
}
