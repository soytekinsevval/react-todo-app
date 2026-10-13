import React from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

/**
 * TodoList Bileşeni
 * Filtrelenmiş görev listesini veya liste boşsa EmptyState bileşenini görüntüler.
 */
export default function TodoList({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
  activeFilter,
  searchQuery,
  onResetSearch,
}) {
  if (!todos || todos.length === 0) {
    return (
      <EmptyState
        filter={activeFilter}
        searchQuery={searchQuery}
        onResetSearch={onResetSearch}
      />
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </div>
  );
}
