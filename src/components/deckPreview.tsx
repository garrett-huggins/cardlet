"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@clerk/nextjs";

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

// remove deck from supabase
const removeDeck = async (id: string, userId: string) => {
  // const supabase = await supabaseAuth(supabaseAccessToken);
  // delete deck base on id
  const { data, error } = await supabase
    .from("decks")
    .delete()
    .match({ id: id, user_id: userId });
  if (error) {
    console.error(error);
  } else {
    window.location.reload();
  }
};

export default function DeckPreview({
  deck,
  showEdit,
}: {
  deck: DeckPreviewProps;
  showEdit: boolean;
}) {
  const link = `/decks/${deck.id}`;
  const { userId } = useAuth();
  // const test = async () => {
  //   const supabaseAccessToken = await getToken({ template: "supabase" });
  //   console.log("supabase", supabaseAccessToken);
  // };
  // test();
  return (
    <Card className="w-full min-h-[200px] relative dark:hover:bg-primary-foreground hover:bg-primary-foreground">
      {showEdit && (
        <Button
          //  @ts-ignore
          onClick={() => removeDeck(deck.id, userId)}
          variant="destructive"
          className="absolute px-2 top-0 right-0 m-2 opacity-80"
        >
          <Trash2 />
        </Button>
      )}
      <Link href={link}>
        <CardHeader>
          <p className="text-lg font-semibold">{deck.name}</p>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="absolute bottom-0 w-full">
          <p className="text-muted-foreground">{deck.cards.length} cards</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
