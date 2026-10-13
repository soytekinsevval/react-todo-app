import React from 'react';

/**
 * TodoStats Bileşeni
 * Görevlerin istatistiki özetini gösteren metrik kartları.
 */
export default function TodoStats({ total = 0, completed = 0, active = 0 }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statCards = [
    {
      title: 'Toplam Görev',
      value: total,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/70',
      borderColor: 'border-indigo-100',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'Devam Edenler',
      value: active,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/70',
      borderColor: 'border-amber-100',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Tamamlananlar',
      value: completed,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/70',
      borderColor: 'border-emerald-100',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Başarı Oranı',
      value: `%${percentage}`,
      iconColor: 'text-sky-600',
      bgColor: 'bg-sky-50/70',
      borderColor: 'border-sky-100',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {statCards.map((card, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-2xl p-4 border ${card.borderColor} shadow-xs hover:shadow-sm transition-shadow flex items-center justify-between`}
        >
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
              {card.title}
            </p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${card.bgColor} ${card.iconColor}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
