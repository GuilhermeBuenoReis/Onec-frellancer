import { NavLink } from 'react-router-dom';
import { ListTodo } from 'lucide-react';

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
                  to="/dashboard"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">🏠</span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">📈</span>
                  <span>Planilhas</span>
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
                  to="/pendencias"
                  className="flex items-center p-2 rounded hover:bg-gray-300"
                >
                  <span className="mr-2">
                    <ListTodo />
                  </span>
                  <span>Pendências</span>
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
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
