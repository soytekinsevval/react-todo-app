import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import { loadTodosFromStorage, saveTodosToStorage } from './interfaces/todoInterface';

/**
 * App Kök Bileşeni
 * Navbar ve TodoPage arasında görev (todos) durumunu senkronize tutar.
 */
export default function App() {
  // Görev verisi kök seviyede tutulur ve LocalStorage ile senkronize edilir
  const [todos, setTodos] = useState(() => loadTodosFromStorage());

  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  // Navbar için canlı istatistik hesaplamaları
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-100/90 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Üst Navigasyon Çubuğu (Canlı Sayaç ve İlerleme Çubuğu İle) */}
      <Navbar totalCount={totalCount} completedCount={completedCount} />

      {/* Ana Sayfa İçeriği */}
      <div className="flex-1">
        <TodoPage todos={todos} setTodos={setTodos} />
      </div>

      {/* Modern Alt Bilgi (Footer) */}
      <footer className="py-6 border-t border-slate-200/80 bg-white/50 backdrop-blur-xs text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} TaskFlow. Tüm veriler tarayıcınızın LocalStorage alanında saklanır.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Vite + React + Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
