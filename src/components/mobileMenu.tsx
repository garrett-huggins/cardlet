"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./themeToggle";
import { Card } from "./ui/card";

const MenuLink = ({ href, text }: { href: string; text: string }) => (
  <SheetClose asChild>
    <Link className="block rounded-md" href={href}>
      <Card className="p-2">
        <p className="text-lg text-foreground">{text}</p>
      </Card>
    </Link>
  </SheetClose>
);

export default function MobileMenu() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Sheet>
      <SignedIn>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-4" />
          <SheetDescription className="text-center space-y-4">
            <MenuLink href="/" text="Home" />
            <MenuLink href="/decks" text="My Decks" />
            <MenuLink href="/decks/builder" text="Create Deck" />
          </SheetDescription>
          <SheetFooter className="items-center mt-4">
            <SheetClose asChild>
              <Button
                variant="destructive"
                onClick={() => signOut(() => router.push("/"))}
              >
                Sign Out
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </SignedIn>
      <SignedOut>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-4" />
          <SheetDescription className="text-center space-y-4">
            <MenuLink href="/" text="Home" />
            <MenuLink href="/sign-up" text="Sign Up" />
            <MenuLink href="/sign-in" text="Log In" />
          </SheetDescription>
        </SheetContent>
      </SignedOut>
    </Sheet>
  );
}
