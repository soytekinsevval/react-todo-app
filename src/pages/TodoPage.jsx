import React, { useState, useMemo } from 'react';
import {
  createTodo,
  loadTodosFromStorage,
  FILTER_TYPES,
} from '../interfaces/todoInterface';
import TodoForm from '../components/TodoForm';
import TodoFilter from '../components/TodoFilter';
import TodoList from '../components/TodoList';
import TodoStats from '../components/TodoStats';

/**
 * TodoPage Bileşeni
 * Sayfa düzeyindeki ana kapsayıcı bileşendir.
 * CRUD operasyonlarını, filtreleme durumlarını ve arama mantığını yönetir.
 */
export default function TodoPage({ todos: propTodos, setTodos: propSetTodos }) {
  // Eğer prop olarak verilmişse dış durumu (App), değilse yerel durumu kullan
  const [internalTodos, setInternalTodos] = useState(() => loadTodosFromStorage());
  const todos = propTodos !== undefined ? propTodos : internalTodos;
  const setTodos = propSetTodos !== undefined ? propSetTodos : setInternalTodos;

  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. CRUD Fonksiyonları
  /**
   * CREATE (Görev Ekleme)
   */
  const handleAddTodo = (title, category, priority) => {
    const newTodo = createTodo(title, category, priority);
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  /**
   * UPDATE (Durum Değiştirme - Tamamlandı / Tamamlanmadı)
   */
  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  /**
   * UPDATE (Başlık, Kategori veya Öncelik Güncelleme)
   */
  const handleUpdateTodo = (id, updatedFields) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  /**
   * DELETE (Tekil Görev Silme)
   */
  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  /**
   * DELETE (Tüm Tamamlanan Görevleri Temizleme)
   */
  const handleClearCompleted = () => {
    if (window.confirm('Tamamlanan tüm görevleri silmek istediğinize emin misiniz?')) {
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
    }
  };

  // 2. İstatistik Hesaplamaları (Memoized Counts)
  const counts = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.isCompleted).length;
    const active = total - completed;

    return {
      all: total,
      active,
      completed,
    };
  }, [todos]);

  // 3. Filtreleme ve Arama Mantığı
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Durum Filtresi
      if (activeFilter === FILTER_TYPES.ACTIVE && todo.isCompleted) return false;
      if (activeFilter === FILTER_TYPES.COMPLETED && !todo.isCompleted) return false;

      // Kategori Filtresi
      if (selectedCategory !== 'ALL' && todo.category !== selectedCategory) {
        return false;
      }

      // Arama Filtresi (Başlık veya kategori içinde arama)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesCategory = todo.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory) return false;
      }

      return true;
    });
  }, [todos, activeFilter, selectedCategory, searchQuery]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* İstatistik Özet Kartları */}
      <TodoStats
        total={counts.all}
        completed={counts.completed}
        active={counts.active}
      />

      {/* Görev Ekleme Formu (Create) */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Filtreleme, Kategori & Arama Çubuğu */}
      <TodoFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClearCompleted={handleClearCompleted}
      />

      {/* Görev Listesi (Read, Update, Delete) & Empty State */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Görev Akışı ({filteredTodos.length})
          </h3>
          {(searchQuery || selectedCategory !== 'ALL' || activeFilter !== FILTER_TYPES.ALL) && (
            <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
              Filtre Aktif
            </span>
          )}
        </div>

        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
          onUpdateTodo={handleUpdateTodo}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onResetSearch={() => setSearchQuery('')}
        />
      </div>
    </main>
  );
}
