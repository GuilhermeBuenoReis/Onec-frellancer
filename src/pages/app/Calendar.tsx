import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import '@/styles/react-calendar-custom.css';
import { useNotificationStore } from '@/store/notification-store';
import { Helmet } from 'react-helmet';

export function Calendario() {
  const lastSpreadsheetUpload = new Date('2025-02-15');
  const lastMetricsUpdate = new Date('2025-02-16');

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Array<{ date: Date; title: string }>>(
    []
  );

  const eventsForDate = events.filter(
    event => event.date.toDateString() === selectedDate.toDateString()
  );

  function addEvent(): void {
    const title = prompt('Digite o título do evento:');
    if (title) {
      const newEvent = { date: selectedDate, title };
      setEvents([...events, newEvent]);

      if (selectedDate.toDateString() === new Date().toDateString()) {
        useNotificationStore.getState().addNotification({
          id: Date.now(),
          type: 'info',
          title: 'Novo Compromisso',
          message: `Você marcou um compromisso para hoje: ${title}`,
          date: new Date(),
        });
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Calendárioa" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="p-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Calendário</h2>

          {/* Resumo de Datas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">
                Última Planilha Subida
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {lastSpreadsheetUpload.toLocaleDateString()}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">
                Últimas Métricas Atualizadas
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {lastMetricsUpdate.toLocaleDateString()}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Eventos do Dia</span>
              <span className="text-2xl font-bold text-gray-800">
                {eventsForDate.length}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Selecione um Dia
            </h3>
            <div className="flex justify-center">
              <Calendar
                onChange={(value, event) => {
                  if (value instanceof Date) {
                    setSelectedDate(value);
                  }
                }}
                value={selectedDate}
                className="react-calendar"
              />
            </div>
            <div className="mt-4 flex justify-center">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Adicionar Evento
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Eventos para {selectedDate.toLocaleDateString()}
            </h3>
            {eventsForDate.length > 0 ? (
              <ul className="space-y-2">
                {eventsForDate.map((event, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <li key={index} className="p-2 border rounded bg-gray-50">
                    {event.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                Nenhum evento cadastrado para este dia.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
