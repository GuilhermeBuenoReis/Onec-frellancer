import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ListTodo, SlidersHorizontal } from 'lucide-react';

export function Sidebar() {
  const [width, setWidth] = useState(250);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const onMouseDown = () => {
    draggingRef.current = true;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      setWidth(Math.max(200, e.clientX));
    };

    const onMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className="flex">
      <aside
        ref={sidebarRef}
        style={{ width }}
        className="h-screen bg-gradient-to-br from-white to-gray-200 text-gray-800 flex flex-col justify-between p-6 md:p-8"
      >
        <div>
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold">Onec</h2>
          </div>
          <nav>
            <div className="mb-6">
              <h4 className="uppercase text-xs md:text-sm font-semibold border-b border-gray-300 pb-2 mb-2">
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
              <h4 className="uppercase text-xs md:text-sm font-semibold border-b border-gray-300 pb-2 mb-2">
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
          </nav>
        </div>
      </aside>
      <div
        onMouseDown={onMouseDown}
        className="w-2 cursor-col-resize bg-gray-300"
      />
    </div>
  );
}
