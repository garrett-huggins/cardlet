import { supabase } from "@/utils/supabase";
import { auth } from "@clerk/nextjs";

interface CardType {
  id: string;
  qustion: string;
  answer: number;
  choices: {
    id: number;
    choice: string;
  }[];
}

interface DeckType {
  id: string;
  name: string;
  user_id: string;
  cards: CardType[];
}

interface DeckPageParams {
  deckId: string;
}

export default async function DeckPage({ params }: { params: DeckPageParams }) {
  const deckId = decodeURIComponent(params.deckId); // Decode the URL-encoded UUID

  // get deck by id from supabase
  const { data, error } = (await supabase
    .from("decks")
    .select("*")
    .match({ id: deckId })
    .single()) as { data: DeckType; error: any };
  if (error) {
    return <div>Error loading deck</div>;
  }
  return (
    <div>
      <h2>{data.name}</h2>
    </div>
  );
}
