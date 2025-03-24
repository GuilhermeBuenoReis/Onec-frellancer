interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-200"
        onClick={onToggleSidebar}
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </header>
  );
}
