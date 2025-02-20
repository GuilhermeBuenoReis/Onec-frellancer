export function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src="https://github.com/guilhermebuenoreis.png"
          alt="Avatar"
        />
        <span>Guilherme</span>
      </div>
    </header>
  );
}
