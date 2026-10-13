import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES, PRIORITIES, formatTodoDate } from '../interfaces/todoInterface';

/**
 * TodoItem Bileşeni
 * Tekil bir görevi kart olarak listeler, tamamlama, güncelleme (inline edit) ve silme işlevlerini sunar.
 */
export default function TodoItem({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedCategory, setEditedCategory] = useState(todo.category);
  const [editedPriority, setEditedPriority] = useState(todo.priority || 'Orta');
  const [editError, setEditError] = useState('');

  const inputRef = useRef(null);

  // Düzenleme moduna geçildiğinde input'a odaklan
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Kategori stilini bul
  const categoryConfig =
    CATEGORIES.find((c) => c.label === todo.category) || CATEGORIES[CATEGORIES.length - 1];

  // Öncelik stilini bul
  const priorityConfig =
    PRIORITIES[todo.priority?.toUpperCase()] || PRIORITIES.MEDIUM;

  const handleStartEdit = () => {
    setEditedTitle(todo.title);
    setEditedCategory(todo.category);
    setEditedPriority(todo.priority || 'Orta');
    setEditError('');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError('');
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      setEditError('Başlık boş bırakılamaz.');
      return;
    }

    onUpdateTodo(todo.id, {
      title: editedTitle.trim(),
      category: editedCategory,
      priority: editedPriority,
    });

    setIsEditing(false);
    setEditError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        todo.isCompleted
          ? 'border-slate-200/70 bg-slate-50/50 opacity-80'
          : 'border-slate-200/90 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5'
      }`}
    >
      {isEditing ? (
        /* DÜZENLEME MODU (INLINE EDIT) */
        <div className="space-y-3">
          <div>
            <input
              ref={inputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => {
                setEditedTitle(e.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Görev başlığı..."
            />
            {editError && <p className="mt-1 text-xs text-rose-500">{editError}</p>}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              {/* Kategori Seç */}
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>

              {/* Öncelik Seç */}
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Dusuk">Düşük</option>
                <option value="Orta">Orta</option>
                <option value="Yuksek">Yüksek</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* NORMAL GÖRÜNÜM */
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          {/* Sol Kısım: Checkbox ve İçerik */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Tamamlama Butonu (Custom Checkbox) */}
            <button
              type="button"
              onClick={() => onToggleComplete(todo.id)}
              className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                todo.isCompleted
                  ? 'bg-emerald-500 text-white shadow-xs shadow-emerald-500/20'
                  : 'border-2 border-slate-300 hover:border-indigo-500 bg-white'
              }`}
              title={todo.isCompleted ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
            >
              {todo.isCompleted && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            {/* Başlık, Rozetler ve Tarih */}
            <div className="flex-1 min-w-0">
              <p
                onClick={() => onToggleComplete(todo.id)}
                className={`text-sm font-medium leading-relaxed break-words cursor-pointer select-none transition-colors ${
                  todo.isCompleted
                    ? 'text-slate-400 line-through'
                    : 'text-slate-800 hover:text-indigo-900'
                }`}
              >
                {todo.title}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Kategori Rozeti */}
                <span
                  className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md border ${categoryConfig.bgClass}`}
                >
                  {todo.category}
                </span>

                {/* Öncelik Rozeti */}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md">
                  <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dotClass}`} />
                  {priorityConfig.label}
                </span>

                {/* Oluşturulma Tarihi */}
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <svg className="w-3 h-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTodoDate(todo.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Sağ Kısım: Aksiyon Butonları (Düzenle & Sil) */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleStartEdit}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
              title="Görevi Düzenle"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => onDeleteTodo(todo.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Görevi Sil"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
