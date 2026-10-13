import React from 'react';

/**
 * EmptyState Bileşeni
 * Görev listesi boş olduğunda veya arama sonucu bulunamadığında gösterilir.
 */
export default function EmptyState({ filter = 'all', searchQuery = '', onResetSearch }) {
  // Duruma göre metin belirleme
  let title = 'Henüz eklenmiş görev yok';
  let description = 'Gününüzü planlamak ve verimliliğinizi artırmak için yukarıdaki formdan yeni bir görev ekleyin.';

  if (searchQuery) {
    title = 'Aramanızla eşleşen görev bulunamadı';
    description = `"${searchQuery}" ifadesiyle ilgili herhangi bir görev kaydı bulunamadı. Filtrelerinizi gözden geçirebilirsiniz.`;
  } else if (filter === 'completed') {
    title = 'Henüz tamamlanan görev yok';
    description = 'Tamamladığınız görevler burada listelenecektir. Başarılarınızı kutlamaya hazır olun!';
  } else if (filter === 'active') {
    title = 'Harika! Bekleyen görev yok';
    description = 'Şu an tamamlanmayı bekleyen herhangi bir görev bulunmuyor. Yeni bir hedef eklemeye ne dersiniz?';
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl transition-all">
      {/* İllüstrasyon / İkon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-2xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-500 shadow-inner">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 opacity-80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-5 leading-relaxed">{description}</p>

      {searchQuery && onResetSearch && (
        <button
          onClick={onResetSearch}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Aramayı Temizle
        </button>
      )}
    </div>
  );
}
