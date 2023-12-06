import { auth } from "@clerk/nextjs";
import { supabase } from "@/utils/supabase";
import DeckPreview from "@/components/deckPreview";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Decks() {
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to logged in users
    console.log("User ID:", userId);
  }

  // Get the User object when you need access to the user's information

  // get decks with userId
  const { data: decks } = await supabase
    .from("decks")
    .select("*")
    .match({ user_id: userId });

  return (
    <div>
      <h2 className="text-center text-2xl">My Decks</h2>
      <div className="flex justify-center my-4">
        <Link href="/decks/builder">
          <Button>Create New Deck</Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3">
        {decks?.map((deck) => (
          <DeckPreview key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}
