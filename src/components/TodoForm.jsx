import React, { useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../interfaces/todoInterface';

/**
 * TodoForm Bileşeni
 * Yeni görevlerin başlık, kategori ve öncelik bilgileriyle oluşturulmasını sağlar.
 */
export default function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].label);
  const [priority, setPriority] = useState('Orta');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Lütfen bir görev başlığı girin.');
      return;
    }

    if (title.trim().length < 3) {
      setError('Görev başlığı en az 3 karakter olmalıdır.');
      return;
    }

    // Görevi ekle ve formu sıfırla
    onAddTodo(title.trim(), category, priority);
    setTitle('');
    setError('');
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm shadow-slate-200/40 mb-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          Yeni Görev Oluştur
        </h2>
        <span className="text-xs text-slate-400">Planla & Tamamla</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Görev Başlığı Girişi */}
        <div>
          <div
            className={`relative flex items-center rounded-xl border transition-all ${
              error
                ? 'border-rose-400 ring-2 ring-rose-100'
                : isFocused
                ? 'border-indigo-500 ring-3 ring-indigo-500/10'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="pl-3.5 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Örn: Müşteri sunumu için slaytları tamamla..."
              className="w-full px-3 py-3 text-sm text-slate-800 placeholder-slate-400 bg-transparent rounded-xl focus:outline-none"
            />
            {title && (
              <button
                type="button"
                onClick={() => setTitle('')}
                className="pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                title="Temizle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {error && (
            <p className="mt-1.5 text-xs font-medium text-rose-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* Seçenekler: Kategori ve Öncelik */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            {/* Kategori Seçimi */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="category-select" className="text-xs font-medium text-slate-500 whitespace-nowrap">
                Kategori:
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Öncelik Seçimi */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-slate-500 whitespace-nowrap">
                Öncelik:
              </label>
              <div className="flex items-center bg-slate-50 p-0.5 border border-slate-200 rounded-lg">
                {Object.values(PRIORITIES).map((p) => {
                  const isSelected = priority === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={`text-[11px] font-medium px-2 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`} />
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Görev Ekle Butonu */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm shadow-indigo-600/25 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Görev Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
