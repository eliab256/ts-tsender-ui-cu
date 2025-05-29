import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <a
          href="https://github.com/eliab256/ts-tsender-ui-cu.git"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="GitHub Repository"
        >
          <FaGithub size={24} />
        </a>
        <h1 className="text-2xl font-bold">tsender</h1>
      </div>

      <div className="flex items-center space-x-4">
        <ConnectButton accountStatus="address" />
      </div>
    </header>
  );
}
