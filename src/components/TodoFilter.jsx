import React from 'react';
import { FILTER_TYPES, CATEGORIES } from '../interfaces/todoInterface';

/**
 * TodoFilter Bileşeni
 * Durum filtreleri (Tümü, Devam Edenler, Tamamlananlar), kategori filtreleme ve arama işlemlerini yönetir.
 */
export default function TodoFilter({
  activeFilter,
  onFilterChange,
  counts,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onClearCompleted,
}) {
  const tabs = [
    { id: FILTER_TYPES.ALL, label: 'Tüm Görevler', count: counts.all },
    { id: FILTER_TYPES.ACTIVE, label: 'Tamamlanmayanlar', count: counts.active },
    { id: FILTER_TYPES.COMPLETED, label: 'Tamamlananlar', count: counts.completed },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs mb-6 space-y-3.5">
      {/* Üst Kısım: Arama & Kategori Seçimi */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Arama Alanı */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Görevlerde ara..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Kategori Filtresi */}
        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 transition-colors cursor-pointer"
          >
            <option value="ALL">Tüm Kategoriler</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alt Kısım: Sekmeler ve Temizle Butonu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-indigo-700/60 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {counts.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors self-end sm:self-auto flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Tamamlananları Temizle ({counts.completed})
          </button>
        )}
      </div>
    </div>
  );
}
