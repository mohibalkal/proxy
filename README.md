# Netlify Video Proxy

## ما هو هذا المشروع؟

مشروع Node.js صغير يمكنك رفعه على Netlify ليعمل كخادم وسيط (Proxy) يسمح لك بتشغيل روابط الفيديو مع هيدر origin/referer مخصص، لتجاوز مشاكل CORS وتشغيل الفيديو في متصفحك بسهولة.

---

## طريقة الاستخدام

### 1. التحميل والرفع
- ارفع جميع الملفات (بما فيها مجلد `netlify/functions` وملف `package.json` و `netlify.toml`) إلى مشروع جديد في Netlify.
- لا حاجة لأي إعدادات خاصة، فقط ارفع المشروع كما هو.

### 2. كيفية طلب الفيديو عبر البروكسي
- استخدم الرابط التالي:
  ```
  https://<YOUR_NETLIFY_DOMAIN>/api/proxy?url=<VIDEO_URL>
  ```
  استبدل `<YOUR_NETLIFY_DOMAIN>` بدومين مشروعك في Netlify.
  واستبدل `<VIDEO_URL>` بالرابط الأصلي للفيديو (بعد عمل encode له).

### 3. مثال عملي

إذا كان رابط الجودة:
```
https://oca.kendrickl-3amar.site/?v=I4hs270gAj44Q%2FuVPKQKi26%2B7xDS9SN5WII3RjqoGo3WPdwwfWwzAHqsnOpxtx3s8Ng8mWE8Bz4edVDnir6c9FfVaroxDqhTTSX3jdxH3iJtgQmoolJARTyyAIYaqXCXSqtxZNoXkX1lk2VAEHPlrxDgGd7cggWzsSydhG7TzSRFGbGZT5AKVsrMBwsnRivPGd5mRmS5zDGY5qdR%2Ba74IQil&headers=%7B%22origin%22%3A%22https%3A%2F%2Fmoviebox.ng%22%2C%22referer%22%3A%22https%3A%2F%2Fmoviebox.ng%22%7D&safe
```

استخدم الرابط التالي بعد الرفع:
```
https://<YOUR_NETLIFY_DOMAIN>/api/proxy?url=https%3A%2F%2Foca.kendrickl-3amar.site%2F%3Fv%3DI4hs270gAj44Q%252FuVPKQKi26%252B7xDS9SN5WII3RjqoGo3WPdwwfWwzAHqsnOpxtx3s8Ng8mWE8Bz4edVDnir6c9FfVaroxDqhTTSX3jdxH3iJtgQmoolJARTyyAIYaqXCXSqtxZNoXkX1lk2VAEHPlrxDgGd7cggWzsSydhG7TzSRFGbGZT5AKVsrMBwsnRivPGd5mRmS5zDGY5qdR%252Ba74IQil%26headers%3D%257B%2522origin%2522%253A%2522https%253A%252F%252Fmoviebox.ng%2522%252C%2522referer%2522%253A%2522https%253A%252F%252Fmoviebox.ng%2522%257D%26safe
```

---

## المتطلبات
- لا تحتاج لتثبيت أي شيء على جهازك.
- كل شيء يتم من خلال Netlify مجانًا.

---

## إذا واجهت مشكلة
- تأكد أن ملف `netlify/functions/proxy.js` موجود.
- تأكد من رفع جميع الملفات.
- إذا ظهرت رسالة خطأ من السيرفر الأصلي، قد يكون هناك حماية إضافية لا يمكن تجاوزها.

---

بالتوفيق! لأي استفسار آخر أنا جاهز للمساعدة.
