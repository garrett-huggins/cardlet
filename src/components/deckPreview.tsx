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
import { ArrowRight } from "lucide-react";

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
    <div className="relative">
      {showEdit ? (
        <Button
          //  @ts-ignore
          onClick={() => removeDeck(deck.id, userId)}
          variant="destructive"
          className="absolute px-2 top-0 right-0 m-2 opacity-80 z-10"
        >
          <Trash2 />
        </Button>
      ) : null}
      <Link className="h-full group" href={link}>
        <Card className="w-full min-h-[200px] dark:hover:bg-primary-foreground hover:bg-primary-foreground">
          <CardHeader>
            <p className="text-lg font-semibold">{deck.name}</p>
          </CardHeader>
          <CardFooter className="absolute bottom-0 w-full flex justify-between">
            <p className="text-muted-foreground">{deck.cards.length} cards</p>
            <Button variant="link" className="group-hover:underline">
              Study{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform ease-in-out"
              />{" "}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
