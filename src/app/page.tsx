import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      <Card className="p-4">
        <CardHeader className="text-center">
          <h2 className="md:text-5xl sm:text-3xl text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Welcome to Cardlet
          </h2>
          <p className="font-semibold">Your Ultimate Study Companion!</p>
        </CardHeader>

        <CardFooter className="text-center block">
          <p className="">
            Master your subjects with customizable flashcards and collaborative
            learning.
          </p>
        </CardFooter>
      </Card>
      <div>
        <h2 className="font-semibold text-xl mb-2">What is Cardlet?</h2>
        <Card className="p-8">
          <ul className="list-disc">
            <li className="mb-2">
              <span className="font-semibold">Cardlet</span> is a web
              application that allows you to create flashcards for studying.
            </li>
            <li className="mb-2">
              You can create your own flashcards or study from flashcards
              created by other users.
            </li>
            <li className="mb-2">
              Cardlet is the go-to platform for efficient and personalized
              learning.
            </li>
            <li className="mb-2">
              Whether you{"'"}re a student preparing for an exam or a
              professional looking to expand your knowledge, Cardlet is here to
              streamline your study experience.
            </li>
          </ul>
        </Card>
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-2">Features</h2>
        <div className="md:grid grid-cols-3 gap-4 md:space-y-0 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <Image
                alt="Preview image of multiple cards"
                src="/images/cards.png"
                width={0}
                height={0}
                sizes="100vh"
                style={{ width: "auto", height: "100%" }}
                className="max-h-[120px] mx-auto"
              />
            </CardHeader>
            <CardContent className="bg-[#6ac1ae] p-2 dark:text-black">
              <p className="text-lg font-medium">Customizable Cards</p>
              <p>Tailor your study materials to your learning style.</p>
            </CardContent>
            <CardFooter className="bg-[#6ac1ae] h-full" />
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <Image
                alt="Preview image of multiple mouse cursors working together on a single card"
                src="/images/collab.png"
                width={0}
                height={0}
                sizes="100vh"
                style={{ width: "auto", height: "100%" }}
                className="max-h-[120px] mx-auto"
              />
            </CardHeader>
            <CardContent className="bg-[#85e6d1] p-2 dark:text-black">
              <p className="text-lg font-medium">Collaborative Learning</p>
              <p>
                Study with classmates in real-time and share your decks so
                others can study.
              </p>
            </CardContent>
            <CardFooter className="bg-[#85e6d1] h-full" />
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <Image
                alt="Preview image of multiple mouse cursors working together on a single card"
                src="/images/study.png"
                width={0}
                height={0}
                sizes="100vh"
                style={{ width: "auto", height: "100%" }}
                className="max-h-[120px] mx-auto"
              />
            </CardHeader>
            <CardContent className="bg-[#8bebae] p-2 dark:text-black">
              <p className="text-lg font-medium">Smart Quiz Mode</p>
              <p>Test your knowledge and trach your progress.</p>
            </CardContent>
            <CardFooter className="text-center bg-[#8bebae] p-2 h-full dark:text-black">
              <p className="text-sm">Coming soon!</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
