import DeckBuilder from "@/components/builder";
import { auth } from "@clerk/nextjs";

export default function BuilderPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>no user</div>;
  }

  return (
    <div>
      <DeckBuilder userId={userId} />
    </div>
  );
}
