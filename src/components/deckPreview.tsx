import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
      <Card className="w-full min-h-[200px] relative dark:hover:bg-primary-foreground hover:bg-primary-foreground">
        <CardHeader>
          <p className="text-lg font-semibold">{deck.name}</p>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="absolute bottom-0 w-full">
          <p className="text-muted-foreground">{deck.cards.length} cards</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
