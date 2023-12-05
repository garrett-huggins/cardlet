"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          variables: {
            colorPrimary: "#16a34a",
          },
        }}
      />
    </div>
  );
}
