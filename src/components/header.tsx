import { Button } from "./ui/button";
import { ThemeToggle } from "./themeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import MobileMenu from "./mobileMenu";
import Image from "next/image";

const Header = () => {
  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <Link href="/">
        <Image
          alt="Cardlet Logo"
          src="/images/cardlet.png"
          width={100}
          height={100}
          className="hover:opacity-80 transition-opacity max-h-[25px]"
        />
      </Link>
      <div className="flex items-center space-x-4">
        <SignedOut>
          <div className="space-x-4 sm:block hidden">
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost" className="border-2 border-primary">
                Log In
              </Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="sm:flex items-center space-x-4 hidden">
            <Link href="/decks">
              <Button>My Decks</Button>
            </Link>
            <div className="rounded-full border-2 border-primary">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </SignedIn>
        <ThemeToggle />
        <div className="sm:hidden block">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
