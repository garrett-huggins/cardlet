import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 h-[72px] bg-secondary w-full">
      <div className="flex justify-center items-center h-full">
        <a
          href="https://github.com/garrett-huggins/cardlet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:underline"
        >
          <Github size={20} />
          <p>View on Github</p>
        </a>
      </div>
    </footer>
  );
}
