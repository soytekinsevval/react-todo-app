# TaskFlow - Modern & Modüler React Todo / Görev Takip Uygulaması

Bu proje, **"Web Geliştirme Yapay Zeka Proje Yönergesi"** standartlarına ve Kıdemli Frontend Geliştirici mimari prensiplerine tam uyumlu olarak geliştirilmiş, modern ve modüler bir React görev yönetim uygulamasıdır.

---

## 🚀 Teknolojik Altyapı
- **Framework:** React 18+ (Vite tabanlı yüksek performanslı yapılandırma)
- **Stil & Tasarım:** Tailwind CSS (Modern renk paleti, yumuşak gölgeler, responsive grid & flexbox düzeni)
- **Veri Kalıcılığı:** Tarayıcı `localStorage` API entegrasyonu (Sayfa yenilendiğinde veya tarayıcı kapatıldığında veri kaybı yaşanmaz)
- **Yayın Uyumluluğu:** Netlify ve GitHub Pages ile sıfır konfigürasyonla tek tıkla canlıya alınabilir mimari.

---

## 📁 Klasör Mimarisi
```text
react-todo-app/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── interfaces/
    │   └── todoInterface.js      # Veri modeli, sabitler (Kategoriler, Öncelikler), LocalStorage ve JSDoc tanımları
    ├── components/
    │   ├── Navbar.jsx            # Üst bar, marka kimliği ve durum göstergesi
    │   ├── TodoStats.jsx         # Özet istatistik metrik kartları
    │   ├── TodoForm.jsx          # Yeni görev ekleme formu (Başlık, Kategori, Öncelik seçimi)
    │   ├── TodoFilter.jsx        # Durum filtreleri (Tümü, Aktif, Tamamlanan), arama ve kategori seçimi
    │   ├── TodoList.jsx          # Görev listesi kapsayıcısı
    │   ├── TodoItem.jsx          # Tekil görev kartı (Tamamlama, Inline Edit, Silme, Rozetler)
    │   └── EmptyState.jsx        # Dinamik boş durum / sonuç bulunamadı bileşeni
    ├── pages/
    │   └── TodoPage.jsx          # Tüm CRUD operasyonlarını ve sayfa mantığını yöneten ana bileşen
    ├── App.jsx                   # Kök bileşen ve genel sayfa düzeni
    ├── main.jsx                  # React DOM başlangıç noktası
    └── index.css                 # Tailwind yönergeleri ve genel stil ayarları
```

---

## ⚡ Temel Özellikler & CRUD Fonksiyonları

1. **Create (Ekleme):**
   - Kullanıcı başlık, kategori (İş, Kişisel, Yazılım, Eğitim, Sağlık, Genel) ve öncelik (Düşük, Orta, Yüksek) seçerek anında görev oluşturabilir.
   - Form doğrulama (boşluk veya 3 karakter altı kontrolleri) mevcuttur.

2. **Read (Listeleme):**
   - Görevler kategoriye özel renkli rozetler, öncelik indikatörleri ve `13 Eki 2026, 13:45` gibi Türkçe biçimlendirilmiş oluşturulma tarihleriyle listelenir.

3. **Update (Güncelleme):**
   - **Durum Güncelleme:** Tek tıkla tamamlandı / tamamlanmadı (toggle) işaretleme. Tamamlanan görevlerde yumuşak üstü çizilme ve opaklık geçişi.
   - **Inline Düzenleme:** Düzenle butonuna basıldığında kart anında düzenleme formuna dönüşür; başlık, kategori ve öncelik güncellenebilir (Enter ile kaydet, Esc ile vazgeç).

4. **Delete (Silme):**
   - İstenilen görev tek tıkla silinebilir.
   - Tamamlanan tüm görevleri toplu silme seçeneği mevcuttur.

5. **Arama & Filtreleme (UI/UX):**
   - Canlı arama kutusu (başlık ve kategori içinde arama).
   - "Tüm Görevler", "Tamamlanmayanlar" ve "Tamamlananlar" sekmeleri ve anlık sayaç rozetleri.
   - Kategoriye göre açılır liste filtreleme.

6. **Boş Durum (Empty State):**
   - Liste boş olduğunda veya arama sonucu bulunamadığında durumuna uygun şık illüstrasyon ve açıklama gösterilir.

---

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için:

```bash
# 1. Proje dizinine gidin
cd react-todo-app

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda otomatik olarak `http://localhost:3000` adresinde açılacaktır.

---

## 🌐 Netlify ve GitHub Yayın Rehberi

### Netlify:
1. GitHub reponuzu Netlify'a bağlayın.
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. "Deploy site" butonuna tıklayın.

### GitHub Pages:
`vite.config.js` dosyasına `base: './'` parametresini ekleyerek GitHub Actions veya gh-pages ile yayınlayabilirsiniz.
