"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

interface CardType {
  id: number;
  question: string;
  answer: number;
  choices: {
    id: number;
    choice: string;
  }[];
}

export default function QuestionCard({ card }: { card: CardType }) {
  const [selected, setSelected] = useState<number | null>(null);
  let counter = 0;
  return (
    <Card>
      <CardHeader className="text-lg">{card.question}</CardHeader>
      <CardContent>
        <ul>
          {card.choices.map(
            (choice) =>
              choice.choice && (
                <li
                  key={choice.id}
                  onClick={() => setSelected(choice.id)}
                  className={`flex space-x-2 list-none hover:bg-muted hover:text-muted-foreground rounded-lg p-2 hover:cursor-pointer ${
                    selected === choice.id
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  <p>{++counter}) </p>
                  <p>{choice.choice}</p>
                </li>
              )
          )}
        </ul>
      </CardContent>
      <div className="border mx-4"></div>
      <CardFooter className="pt-2">
        {selected !== null ? (
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
