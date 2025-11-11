# مذكرة تقنية: دمج صفحة الهبوط ثلاثية المراحل

## نظرة عامة
تم تنفيذ دمج صفحة هبوط ثلاثية المراحل داخل المشروع الرئيسي باستخدام Next.js App Router. الصفحة تتضمن:
1. **المرحلة 1+2**: Hero section مع فيديو text mask وحركة انتقالية
2. **المرحلة 3**: معرض بطاقات تفاعلي مع 11 بطاقة

## البنية المسارية

### Route Groups
تم إنشاء مجموعة مسارات `(landing)` منفصلة لتفادي تعارض الهيدر:

```
frontend/src/app/
├── (landing)/
│   ├── layout.tsx          # Layout بسيط بدون Sidebar/Header
│   └── page.tsx            # صفحة الهبوط الرئيسية
├── (main)/
│   ├── layout.tsx          # Layout مع Sidebar/Header للصفحات الداخلية
│   ├── directors-studio/
│   ├── editor/
│   └── ... (صفحات التطبيق الأخرى)
└── layout.tsx              # Root layout
```

### معالجة التعارض
- تم نقل `app/page.tsx` القديمة إلى `app/page.tsx.old`
- `app/(landing)/page.tsx` أصبحت الصفحة الرئيسية في المسار `/`

## المكونات المنسوخة والمُكيّفة

### 1. المرحلة 1+2 (Hero + Video Scroll Effect)

**المصدر**: `Integrate Video Scroll Effect/src/components/`

**الوجهة**: `frontend/src/components/landing/`

**المكونات**:
- `video-text-mask.tsx`: مكون قناع النص بالفيديو
- `landing-header.tsx`: هيدر خاص بصفحة الهبوط

**التكييفات**:
```typescript
// في video-text-mask.tsx (السطر 55)
// قبل:
<div className="absolute inset-0 -z-10 bg-black" />

// بعد:
<div className="absolute inset-0 -z-10 bg-white" />
```

**الخلفية**: تم تغيير الخلفية الاحتياطية من أسود إلى **أبيض صريح** (`bg-white`) لضمان عدم ظهور أي خلفية سوداء قبل اكتمال ظهور الهيدر.

### 2. المرحلة 3 (Sliding Carousel)

**المصدر**: `slidingcarousel/components/carousel/`

**الوجهة**: `frontend/src/components/landing/carousel/`

**المكونات**:
- `sliding-carousel.tsx`: الكاروسيل الرئيسي
- `cards.config.ts`: إعداد البطاقات الـ11

**البطاقات الـ11**:
```typescript
export const CARDS_11 = [
  { key: "card-01", title: "استوديو الإخراج", href: "/directors-studio" },
  { key: "card-02", title: "نص السيناريو", href: "/editor" },
  { key: "card-03", title: "التحليل الدرامي", href: "/analysis" },
  { key: "card-04", title: "الكتابة الإبداعية العربية", href: "/arabic-creative-writing-studio" },
  { key: "card-05", title: "تمثيل (عربي)", href: "/actorai-arabic" },
  { key: "card-06", title: "السينماتوغرافي", href: "/cinematography-studio" },
  { key: "card-07", title: "تفكيك المشاهد", href: "/breakdown" },
  { key: "card-08", title: "التطوير", href: "/development" },
  { key: "card-09", title: "العصف الذهني", href: "/brainstorm" },
  { key: "card-10", title: "لوحة القياسات", href: "/metrics-dashboard" },
  { key: "card-11", title: "هندسة البرومبت العربي", href: "/arabic-prompt-engineering-studio" },
];
```

كل بطاقة ملفوفة داخل `<Link href={item.href}>` للانتقال إلى الصفحة المقابلة.

## حركات GSAP

### 1. حركة Hero Section
```typescript
// عند أول تمرير (scroll):
// 1. تكبير خفيف وتلاشي النص (≤ 0.3s)
gsap.to(textElement, {
  scale: 1.1,
  opacity: 0,
  duration: 0.3,
  ease: "power2.out",
});

// 2. نزول الهيدر من أعلى (0.35s) - متزامن
gsap.to(headerElement, {
  y: 0,
  opacity: 1,
  duration: 0.35,
  ease: "power2.out",
}, "<");  // Start at same time
```

**ملاحظات**:
- الهيدر يبدأ بـ `opacity: 0` و `transform: translateY(-100%)`
- الخلفية تظل **بيضاء** طوال الوقت (لا ظهور لأي خلفية سوداء)
- الحركتان تحدثان **بالتزامن** باستخدام `"<"` في GSAP

### 2. حركة Carousel Section
```typescript
// دخول من أسفل إلى أعلى
gsap.fromTo(carouselSectionRef.current, {
  y: 60,
  opacity: 0,
}, {
  y: 0,
  opacity: 1,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: carouselSectionRef.current,
    start: "top 65%",
  },
});
```

## الوصولية (Accessibility)

### 1. دعم `prefers-reduced-motion`
```typescript
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  setPrefersReducedMotion(mediaQuery.matches);
  // ...
}, []);
```

إذا كان المستخدم يفضل تقليل الحركة:
- يظهر الهيدر مباشرة بدون حركة
- يتم تعطيل autoPlay في الكاروسيل
- تُبسّط جميع الحركات

### 2. تنقل الكيبورد
- **الكاروسيل**: يدعم `ArrowLeft` و `ArrowRight` للتنقل
- **البطاقات**: كل بطاقة قابلة للتركيز (focusable) مع `tabIndex`
- **الأزرار**: تدعم `Enter` و `Space` للتفعيل

### 3. معايير التباين
- النصوص على خلفية بيضاء: `text-gray-900` (تباين عالي)
- الأزرار: `focus:ring-2` لوضوح التركيز
- Labels: كل عنصر تفاعلي له `aria-label` مناسب

## SSR و Client-Side

### Client Components
جميع المكونات التفاعلية تستخدم `"use client"`:
- `video-text-mask.tsx`
- `landing-header.tsx`
- `sliding-carousel.tsx`
- `page.tsx` (الصفحة الرئيسية)

### GSAP Registration
```typescript
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

يتم التحقق من البيئة قبل تسجيل GSAP لتجنب أخطاء SSR.

## الملفات الجديدة

```
frontend/src/
├── app/
│   ├── (landing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── page.tsx.old              # الصفحة القديمة (محفوظة)
│   └── page.test.tsx.old         # اختبار الصفحة القديمة (محفوظ)
├── components/
│   └── landing/
│       ├── video-text-mask.tsx
│       ├── landing-header.tsx
│       └── carousel/
│           ├── sliding-carousel.tsx
│           └── cards.config.ts
└── lib/
    └── utils.ts                   # دوال مساعدة (cn)
```

## التحسينات المستقبلية

1. **الفيديو**: حاليًا يستخدم رابط خارجي من Pexels. يُنصح بتحميل الفيديو محليًا في `public/videos/` لتحسين الأداء.

2. **الصور**: البطاقات تستخدم gradients. يمكن إضافة صور حقيقية في المستقبل.

3. **الرسوم المتحركة**: يمكن إضافة المزيد من التفاصيل مثل particle effects أو parallax scrolling.

4. **التحسينات**:
   - Lazy loading للمكونات الثقيلة
   - Image optimization
   - Code splitting للكاروسيل

## الاختبار

### معايير القبول
- ✅ بداية لوحة بيضاء + نص «النسخة» بقناع فيديو
- ✅ أول تمرير: تكبير وتلاشي النص ≤ 0.3s، نزول هيدر أسود
- ✅ لا ظهور لخلفية سوداء قبل اكتمال دخول الهيدر
- ✅ الكاروسيل يظهر بحركة صعودية مع 11 بطاقة
- ✅ كل بطاقة تفتح صفحة صحيحة
- ✅ دعم `prefers-reduced-motion`
- ✅ تنقل الكيبورد يعمل

### الاختبارات المطلوبة
1. **Desktop**: تحقق من الحركات على شاشات كبيرة
2. **Mobile**: تحقق من التجاوب والـ touch events
3. **Accessibility**: اختبار بقارئ الشاشة
4. **Performance**: قياس CLS و LCP

## الملاحظات

- تم حفظ الصفحة القديمة في `page.tsx.old` لإمكانية الرجوع إليها
- المشروع يستخدم GSAP 3.13.0 مع ScrollTrigger
- جميع الحركات تحترم `prefers-reduced-motion`
- الكود يتبع معايير Next.js 15 و App Router

---

**تاريخ الإنشاء**: 2025-11-11
**الإصدار**: 1.0.0
