import React from 'react';

/**
 * Navbar Bileşeni
 * Üst başlık çubuğu, anlık ilerleme durumu çubuğu ve marka alanını içerir.
 * @param {number} totalCount - Toplam görev sayısı
 * @param {number} completedCount - Tamamlanan görev sayısı
 */
export default function Navbar({ totalCount = 0, completedCount = 0 }) {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllDone = totalCount > 0 && completedCount === totalCount;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Sol Taraf: Logo & Marka */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">TaskFlow</h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Modern & Modüler Görev Yönetim Sistemi
            </p>
          </div>
        </div>

        {/* Sağ Taraf: Canlı İlerleme Çubuğu & Durum Rozeti */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
            <div className="text-right">
              <div className="text-[11px] font-medium text-slate-500 flex items-center justify-end gap-1">
                <span>Genel İlerleme</span>
                {totalCount > 0 && (
                  <span className="text-slate-400 font-semibold">
                    ({completedCount}/{totalCount})
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold text-slate-900">
                %{completionPercentage} Tamamlandı
              </div>
            </div>
            <div className="w-16 sm:w-20 bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  isAllDone ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Durum Rozeti */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Yerel Kayıt Aktif</span>
          </div>
        </div>
      </div>
    </header>
  );
}
