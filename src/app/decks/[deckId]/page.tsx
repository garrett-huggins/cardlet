import { supabase } from "@/utils/supabase";
import QuestionCard from "@/components/questionCard";

interface CardType {
  id: string;
  question: string;
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
      <h2 className="text-center text-xl font-bold mb-2">{data.name}</h2>
      <div className="space-y-4">
        {
          // map over cards
          data.cards.map((card) => (
            <QuestionCard key={card.id} card={card} />
          ))
        }
      </div>
    </div>
  );
}
