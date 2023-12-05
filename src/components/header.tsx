import { Button } from "./ui/button";
import { ThemeToggle } from "./themeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import MobileMenu from "./mobileMenu";

// add signout

const Header = () => {
  const { userId } = auth();

  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between">
      <Link href="/">
        <h1 className="text-3xl font-bold hover:text-primary">Cardlet</h1>
      </Link>
      <div className="flex items-center space-x-4">
        {!userId && (
          <div className="space-x-4 sm:block hidden">
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost">Log In</Button>
            </Link>
          </div>
        )}
        {userId && (
          <div className="sm:flex items-center space-x-4 hidden">
            <Link href="/decks">
              <Button>My Decks</Button>
            </Link>
            <div className="rounded-full border-2">
              <UserButton />
            </div>
          </div>
        )}
        <ThemeToggle />
        <div className="sm:hidden block">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
