import { Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <button
        type="button"
        className="md:hidden p-2 rounded hover:bg-gray-200"
        onClick={toggleSidebar}
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </header>
  );
}
