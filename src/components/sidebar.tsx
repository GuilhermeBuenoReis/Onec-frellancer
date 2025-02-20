import { NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-br from-white to-gray-200 text-gray-800 flex flex-col justify-between p-8">
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Onec</h2>
        </div>
        <nav>
          <div className="mb-6">
            <h4 className="uppercase text-sm font-semibold border-b border-gray-300 pb-2 mb-2">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">🏠</span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/investimentos"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">📈</span>
                  <span>Investimentos</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rh"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">👥</span>
                  <span>Parceiros</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="uppercase text-sm font-semibold border-b border-gray-300 pb-2 mb-2">
              Relatórios
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/financas"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">💰</span>
                  <span>Finanças</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/analises"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">📊</span>
                  <span>Análises</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-sm font-semibold border-b border-gray-300 pb-2 mb-2">
              Outros
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/calendario"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">📅</span>
                  <span>Calendário</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notificacoes"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">🔔</span>
                  <span>Notificações</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/configuracoes"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">⚙️</span>
                  <span>Configurações</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-gray-300 pt-4 text-center">
        <div className="flex items-center justify-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://github.com/guilhermebuenoreis.png"
            alt="Avatar"
          />
          <span>Guilherme</span>
        </div>
      </div>
    </aside>
  );
}
