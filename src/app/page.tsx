import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Card className="border-[3px] p-4">
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
      <h2></h2>
    </div>
  );
}
