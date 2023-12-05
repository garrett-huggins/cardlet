import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

// add signout

const Header = () => {
  const { userId } = auth();

  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between">
      <a href="/">
        <h1 className="text-3xl font-bold">Cardlet</h1>
      </a>
      <div className="flex items-center">
        {!userId && (
          <div className="space-x-4">
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost">Log In</Button>
            </Link>
          </div>
        )}
        {userId && (
          <div className="flex items-center space-x-4">
            <Link href="/decks">
              <Button>My Decks</Button>
            </Link>
            <div className="rounded-full border-2">
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
