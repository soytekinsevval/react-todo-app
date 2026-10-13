/**
 * @file todoInterface.js
 * @description Todo veri modeli, tipleri, sabitleri ve LocalStorage yardımcı fonksiyonları.
 * "Web Geliştirme Yapay Zeka Proje Yönergesi" mimari standartlarına uygun olarak tasarlanmıştır.
 */

/**
 * Görev (Todo) Veri Tipi Tanımı (JSDoc Type Definition)
 * @typedef {Object} TodoItem
 * @property {string} id - Benzersiz kimlik (UUID veya benzersiz zaman damgası)
 * @property {string} title - Görevin başlığı / açıklaması
 * @property {string} category - Görev kategorisi (İş, Kişisel, Yazılım vb.)
 * @property {boolean} isCompleted - Görevin tamamlanma durumu
 * @property {string} createdAt - Oluşturulma tarihi (ISO String veya formatlanmış tarih)
 * @property {'Dusuk' | 'Orta' | 'Yuksek'} priority - Görev önceliği
 */

/**
 * Desteklenen Kategori Listesi ve Renk Tanımları
 */
export const CATEGORIES = [
  { id: 'is', label: 'İş', color: 'blue', bgClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'kisisel', label: 'Kişisel', color: 'emerald', bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'yazilim', label: 'Yazılım', color: 'purple', bgClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'egitim', label: 'Eğitim', color: 'amber', bgClass: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'saglik', label: 'Sağlık', color: 'rose', bgClass: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'genel', label: 'Genel', color: 'slate', bgClass: 'bg-slate-50 text-slate-700 border-slate-200' },
];

/**
 * Öncelik Seviyeleri
 */
export const PRIORITIES = {
  LOW: { id: 'Dusuk', label: 'Düşük', dotClass: 'bg-emerald-500', badgeClass: 'bg-emerald-100 text-emerald-800' },
  MEDIUM: { id: 'Orta', label: 'Orta', dotClass: 'bg-amber-500', badgeClass: 'bg-amber-100 text-amber-800' },
  HIGH: { id: 'Yuksek', label: 'Yüksek', dotClass: 'bg-rose-500', badgeClass: 'bg-rose-100 text-rose-800' },
};

/**
 * Filtreleme Türleri
 */
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

/**
 * LocalStorage Anahtarı
 */
export const STORAGE_KEY = 'v_react_todo_tasks_data';

/**
 * Yeni bir Todo nesnesi oluşturan fabrika fonksiyonu (Factory Function)
 * @param {string} title - Görev başlığı
 * @param {string} category - Görev kategorisi
 * @param {'Dusuk' | 'Orta' | 'Yuksek'} priority - Öncelik
 * @returns {TodoItem}
 */
export const createTodo = (title, category = 'Genel', priority = 'Orta') => {
  const now = new Date();
  
  return {
    id: `todo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    title: title.trim(),
    category: category || 'Genel',
    isCompleted: false,
    priority: priority || 'Orta',
    createdAt: now.toISOString(),
  };
};

/**
 * Tarihi kullanıcı dostu formata dönüştürür (Örn: "13 Eki 2026, 13:45")
 * @param {string} isoString 
 * @returns {string}
 */
export const formatTodoDate = (isoString) => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    return isoString;
  }
};

/**
 * Başlangıç verisi (İlk kez açıldığında kullanıcıya örnek olması için)
 * @type {TodoItem[]}
 */
export const INITIAL_TODOS = [
  {
    id: 'todo_seed_1',
    title: 'React ve Tailwind CSS ile proje mimarisini hazırla',
    category: 'Yazılım',
    isCompleted: true,
    priority: 'Yuksek',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'todo_seed_2',
    title: 'LocalStorage veri kalıcılığı ve CRUD fonksiyonlarını test et',
    category: 'Yazılım',
    isCompleted: false,
    priority: 'Yuksek',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'todo_seed_3',
    title: 'Haftalık ekip toplantısına sunum hazırla',
    category: 'İş',
    isCompleted: false,
    priority: 'Orta',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'todo_seed_4',
    title: 'Günlük 30 dakika yürüyüş ve meditasyon yap',
    category: 'Sağlık',
    isCompleted: false,
    priority: 'Dusuk',
    createdAt: new Date(Date.now() - 900000).toISOString(),
  },
];

/**
 * LocalStorage'dan görevleri okur
 * @returns {TodoItem[]}
 */
export const loadTodosFromStorage = () => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // İlk ziyaret için örnek veriyi yaz ve dön
      saveTodosToStorage(INITIAL_TODOS);
      return INITIAL_TODOS;
    }
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error);
    return INITIAL_TODOS;
  }
};

/**
 * Görevleri LocalStorage'a kaydeder
 * @param {TodoItem[]} todos 
 */
export const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('LocalStorage yazma hatası:', error);
  }
};
