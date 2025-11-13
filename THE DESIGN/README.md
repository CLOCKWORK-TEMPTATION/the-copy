# 🎬 النسخة - الصفحة الرئيسية

الصفحة الرئيسية لمنصة **النسخة** - منصة متكاملة للكتابة الإبداعية والتحليل الدرامي مدعومة بالذكاء الاصطناعي.

## ✨ المميزات

### 1. **Hero Section مع Video Text Mask**
- تأثير فيديو متقدم يظهر داخل حروف كلمة "النسخة"
- مستوحى من تصميم promise.ai
- يستخدم `mix-blend-mode: screen` و CSS layers
- تأثيرات GSAP للتمرير:
  - صعود للأعلى مع تكبير (y: -200, scale: 1.5)
  - ظهور الهيدر الأسود تدريجياً

### 2. **Cards Scanner Section**
- **11 بطاقة** متحركة تمثل صفحات التطبيق المختلفة
- حركة مستمرة من اليمين لليسار في **loop لا نهائي**
- تأثير **scanning** يحول البطاقات إلى ASCII عند المرور بالسكانر
- **جميع البطاقات قابلة للنقر** وتحتوي على روابط للصفحات المخصصة
- دعم السحب والإفلات (Drag & Drop)
- تأثيرات جسيمات (Particles) باستخدام Three.js
- دعم كامل للوصولية و `prefers-reduced-motion`

### 3. **تأثيرات متقدمة**
- رسوم متحركة سلسة باستخدام GSAP
- جسيمات 3D باستخدام Three.js
- تأثيرات Canvas للسكانر
- استجابة كاملة للأجهزة المختلفة

---

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **React 18** | إطار العمل الأساسي |
| **TypeScript** | لغة البرمجة |
| **GSAP** | الرسوم المتحركة والتمرير |
| **Three.js** | تأثيرات الجسيمات 3D |
| **Tailwind CSS 4.0** | التصميم والأنماط |
| **Canvas API** | تأثيرات السكانر |

---

## 📋 متطلبات النظام

- **Node.js**: الإصدار 18 أو أحدث
- **npm** أو **yarn** أو **pnpm**
- متصفح حديث يدعم ES6+

---

## 🚀 خطوات التنصيب

### 1. استنساخ المشروع

```bash
git clone https://github.com/CLOCKWORK-TEMPTATION/thecopy-landing.git
cd thecopy-landing
```

### 2. تثبيت المكتبات

باستخدام npm:
```bash
npm install
```

أو باستخدام yarn:
```bash
yarn install
```

أو باستخدام pnpm:
```bash
pnpm install
```

### 3. تثبيت المكتبات المطلوبة

تأكد من تثبيت جميع المكتبات الأساسية:

```bash
npm install react react-dom gsap three tailwindcss
```

أو:

```bash
yarn add react react-dom gsap three tailwindcss
```

### 4. تشغيل المشروع

```bash
npm run dev
```

أو:

```bash
yarn dev
```

افتح المتصفح على `http://localhost:3000` أو `http://localhost:5173` حسب إعدادات المشروع.

---

## 📁 هيكل المشروع

```
📦 thecopy-landing/
├── 📄 App.tsx                                    # نقطة الدخول الرئيسية
├── 📄 home-page.tsx                              # الصفحة الرئيسية
├── 📂 components/
│   ├── 📄 video-text-mask.tsx                    # مكون Video Mask
│   ├── 📂 card-scanner/
│   │   └── 📄 landing-card-scanner.tsx           # مكون Cards Scanner
│   └── 📂 carousel/
│       └── 📄 cards.config.ts                    # بيانات البطاقات الـ 11
├── 📂 config/
│   └── 📄 images.ts                              # مسارات صور البطاقات
├── 📂 styles/
│   └── 📄 globals.css                            # الأنماط العامة
├── 📂 lib/
│   └── 📄 utils.ts                               # دوال مساعدة
└── 📄 README.md                                  # هذا الملف
```

---

## 🎯 كيفية الاستخدام

### تعديل محتوى البطاقات

افتح ملف `/components/carousel/cards.config.ts`:

```typescript
export const CARDS_11 = [
  {
    key: "card-01",
    title: "استوديو الإخراج",
    description: "أدوات احترافية للمخرجين لتخطيط وتنفيذ رؤيتهم الإبداعية",
    href: "/directors-studio",
  },
  // ... أضف أو عدّل البطاقات هنا
];
```

### تغيير صور البطاقات

افتح ملف `/config/images.ts`:

```typescript
const images: string[] = [
  "https://your-image-url-1.jpg", // 0: actorai-arabic
  "https://your-image-url-2.jpg", // 1: analysis
  // ... أضف روابط الصور هنا
];
```

### تخصيص الفيديو في Hero Section

افتح ملف `/home-page.tsx` وابحث عن:

```tsx
<VideoTextMask
  ref={maskContentRef}
  videoSrc="https://cdn.pixabay.com/video/2025/11/09/314880.mp4"  // غيّر رابط الفيديو هنا
  text="النسخة"  // غيّر النص هنا
  className="w-full h-full"
/>
```

### تخصيص العنوان الرئيسي

في ملف `/home-page.tsx`، ابحث عن القسم:

```tsx
<h2 className="text-4xl md:text-5xl mb-4 text-white">
  بس اصلي  {/* غيّر العنوان هنا */}
</h2>
```

---

## ⚙️ التخصيص المتقدم

### تعديل سرعة حركة البطاقات

في ملف `/components/card-scanner/landing-card-scanner.tsx`، ابحث عن:

```typescript
this.velocity = 120  // السرعة الافتراضية (زد أو قلّل الرقم)
```

### تعديل عدد تكرار البطاقات في Loop

في نفس الملف، ابحث عن:

```typescript
const repeatCount = 6  // زد العدد لحركة أكثر سلاسة
```

### تعديل تأثيرات GSAP

في ملف `/home-page.tsx`، ابحث عن:

```typescript
heroTimeline.to(maskContent, {
  scale: 1.5,      // درجة التكبير
  y: -200,         // المسافة للأعلى
  opacity: 0,      // الشفافية
  ease: "power2.in",
});
```

---

## 🎨 الألوان والتصميم

جميع الألوان والتصميمات محددة في `/styles/globals.css` باستخدام CSS Variables:

```css
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  /* ... المزيد من المتغيرات */
}
```

يمكنك تعديل هذه المتغيرات لتخصيص الألوان حسب هوية علامتك التجارية.

---

## 🐛 المشاكل الشائعة وحلولها

### المشكلة: الفيديو لا يظهر

**الحل:**
- تأكد من أن رابط الفيديو صحيح ويعمل
- تحقق من دعم المتصفح لتشغيل الفيديو
- جرّب فيديو آخر من مصدر مختلف

### المشكلة: البطاقات لا تتحرك بسلاسة

**الحل:**
- زد عدد `repeatCount` في ملف `landing-card-scanner.tsx`
- تأكد من أن جهازك يدعم تسريع الرسوميات
- قلّل عدد الجسيمات في ParticleSystem

### المشكلة: GSAP لا يعمل

**الحل:**
```bash
npm install gsap
# أو
yarn add gsap
```

ثم تأكد من الاستيراد الصحيح:
```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
```

### المشكلة: Three.js يعطي أخطاء

**الحل:**
```bash
npm install three @types/three
# أو
yarn add three @types/three
```

---

## 📱 الاستجابة للأجهزة

الصفحة مصممة لتكون متجاوبة بالكامل مع جميع أحجام الشاشات:

- **Desktop**: تجربة كاملة مع جميع التأثيرات
- **Tablet**: تأثيرات محسّنة للأداء
- **Mobile**: تصميم مبسط مع الحفاظ على الوظائف الأساسية

---

## ♿ الوصولية (Accessibility)

تم تصميم الصفحة مع مراعاة معايير الوصولية:

- دعم `prefers-reduced-motion` للمستخدمين الذين يفضلون تقليل الحركة
- تباين ألوان مناسب
- دعم القراءة بواسطة screen readers
- روابط واضحة وقابلة للوصول

---

## 🔄 التحديثات المستقبلية

- [ ] إضافة دعم للغات متعددة
- [ ] تحسين الأداء للأجهزة المحمولة
- [ ] إضافة المزيد من تأثيرات الانتقال
- [ ] دمج مع نظام إدارة المحتوى (CMS)

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف `LICENSE` للمزيد من المعلومات.

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📞 الدعم

إذا واجهت أي مشاكل أو لديك أسئلة:

- افتح **Issue** في GitHub
- راسلنا على البريد الإلكتروني: support@thecopy.app
- زر موقعنا: [www.thecopy.app](https://www.thecopy.app)

---

## 🙏 شكر وتقدير

- تصميم مستوحى من [promise.ai](https://promise.ai)
- الصور من [Unsplash](https://unsplash.com)
- الأيقونات من [Lucide Icons](https://lucide.dev)

---

<div align="center">

**صُنع بـ ❤️ في مصر**

⭐ إذا أعجبك المشروع، لا تنسى إضافة نجمة على GitHub!

[الموقع الرسمي](https://thecopy.app) • [التوثيق](https://docs.thecopy.app) • [المدونة](https://blog.thecopy.app)

</div>
