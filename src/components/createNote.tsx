"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

// @ts-ignore
export default function CreateNote({ userId, children }) {
  const router = useRouter();
  const createNote = async () => {
    const { data, error } = await supabase.from("notes").insert([
      {
        title: userId,
      },
    ]);
    if (error) {
      console.log("error", error);
    } else {
      // refresh page
      router.refresh();
    }
  };

  return <Button onClick={createNote}>{children}</Button>;
}
