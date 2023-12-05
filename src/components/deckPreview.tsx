import { Card } from "@/components/ui/card";
import Link from "next/link";

interface DeckPreviewProps {
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
}

export default function DeckPreview({ deck }: { deck: DeckPreviewProps }) {
  const link = `/decks/${deck.id}`;
  return (
    <Link href={link}>
      <Card className="p-4 w-full min-h-[200px]">
        <h2 className="text-lg">{deck.name}</h2>
        <p>{deck.cards.length} cards</p>
      </Card>
    </Link>
  );
}
