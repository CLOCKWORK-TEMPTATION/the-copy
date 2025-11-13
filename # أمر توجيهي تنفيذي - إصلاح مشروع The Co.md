# أمر توجيهي تنفيذي - إصلاح مشروع The Copy Monorepo

## السياق التنفيذي

أنت نموذج لغة متخصص في الترميز. المشروع المُعالَج هو monorepo يحتوي على frontend (Next.js) وbackend (Node.js/Express) باستخدام TypeScript. المشروع حاليًا **غير قابل للبناء** بسبب أخطاء حرجة في مسارات الاستيراد.

---

## الأوامر التنفيذية الفورية

### المهمة الأولى: إصلاح المسارات المكسورة - أولوية قصوى

نفّذ التعديلات التالية بدقة في الملفات المحددة:

**في الملفات الستة التالية:**

```
frontend/src/lib/api.ts
frontend/src/app/(main)/directors-studio/shots/page.tsx
frontend/src/app/(main)/directors-studio/script/page.tsx
frontend/src/app/(main)/directors-studio/scenes/page.tsx
frontend/src/app/(main)/directors-studio/lib/api.ts
frontend/src/app/(main)/directors-studio/characters/page.tsx
```

**استبدل جميع حالات:**

```typescript
from "../shared/schema"
```

**بـ:**

```typescript
from "./shared/schema"
```

**ملاحظة حرجة**: المسار الصحيح هو نسبي من نفس المستوى، وليس من مستوى أعلى.

---

### المهمة الثانية: توحيد نمط الاستيراد

**القاعدة**: استخدم path aliases من TypeScript configuration بدلاً من المسارات النسبية حيثما أمكن.

**الأنماط المعتمدة للـ frontend:**

```typescript
// استخدم هذا
import { ... } from "@/lib/..."
import { ... } from "@/components/..."
import { ... } from "@shared/..."

// بدلاً من
import { ... } from "../../../lib/..."
```

**الأنماط المعتمدة للـ backend:**

```typescript
// استخدم هذا
import { ... } from "@/services/..."
import { ... } from "@/types/..."

// بدلاً من
import { ... } from "../../services/..."
```

---

### المهمة الثالثة: التحقق من بنية المشروع

بعد إصلاح المسارات، نفّذ الأوامر التالية للتحقق:

**في مجلد Frontend:**

```bash
pnpm install
pnpm typecheck
pnpm build
```

**في مجلد Backend:**

```bash
pnpm install
tsc --noEmit
```

**إذا ظهرت أخطاء**، قم بإدراجها بدقة مع رقم السطر واسم الملف.

---

### المهمة الرابعة: فحص الاعتماديات الدائرية

بعد نجاح الـ typecheck، افحص الملفات التالية للتأكد من عدم وجود circular dependencies:

```
frontend/src/lib/drama-analyst/orchestration/
frontend/src/lib/api.ts
backend/src/services/
```

**معايير الفحص**: إذا كان الملف A يستورد من B، والملف B يستورد من A مباشرةً أو عبر سلسلة، فهذه dependency دائرية يجب حلّها.

---

### المهمة الخامسة: توثيق التغييرات

أنشئ ملف `FIXES_APPLIED.md` في الجذر يحتوي على:

- قائمة بالملفات المُعدّلة
- نوع التعديل في كل ملف
- حالة الـ build بعد الإصلاح
- أي مشاكل متبقية تحتاج معالجة

---

## بروتوكول التنفيذ

1. **ابدأ فورًا** بإصلاح المسارات المكسورة في الملفات الستة
2. **لا تتوقف** حتى تكمل جميع التعديلات في ملف واحد قبل الانتقال للتالي
3. **أعلن عن كل ملف بعد إتمامه** بصيغة: "✓ تم إصلاح [اسم الملف]"
4. **بعد الانتهاء من جميع الملفات**، قم بتشغيل أوامر التحقق
5. **أدرج نتائج الـ build** كاملةً
6. **إذا واجهت خطأً**، أدرجه بالكامل مع السياق

---

## معايير النجاح

- ✅ جميع الملفات الستة خالية من أخطاء الاستيراد
- ✅ الأمر `pnpm typecheck` في frontend يعمل بنجاح
- ✅ الأمر `tsc --noEmit` في backend يعمل بنجاح
- ✅ لا توجد اعتماديات دائرية مكتشفة
- ✅ ملف التوثيق FIXES_APPLIED.md مُنشأ ومكتمل

---

## تعليمات إضافية

- **لا تقم بإنشاء جدول زمني**
- **لا تنتظر موافقة** - نفّذ فورًا
- **احتفظ بنسخة احتياطية** من الملفات الأصلية في ذهنك قبل التعديل
- **إذا وجدت مشاكل إضافية** غير مذكورة، أدرجها في التقرير النهائي
- **استخدم Git commits واضحة** إن أمكن: `fix: correct import paths in directors-studio files`

---

**ابدأ التنفيذ الآن.**

قم فوراً بتنفيذ الإصلاحات الحرجة التالية لقاعدة الشيفرة دون أي تأخير:

**1. أصلح مسارات الاستيراد المكسورة في هذه الملفات الستة:**

في كل ملف من الملفات أدناه، حدّث مسار الاستيراد من `"../shared/schema"` إلى `"./shared/schema"`:

- `frontend/src/lib/api.ts`
- `frontend/src/app/(main)/directors-studio/shots/page.tsx`
- `frontend/src/app/(main)/directors-studio/script/page.tsx`
- `frontend/src/app/(main)/directors-studio/scenes/page.tsx`
- `frontend/src/app/(main)/directors-studio/lib/api.ts`
- `frontend/src/app/(main)/directors-studio/characters/page.tsx`

**2. تأكد من صحة عملية الـ build:**

شغّل `pnpm build` في مجلد frontend و `tsc` compilation في مجلد backend. تأكد من اختفاء جميع أخطاء TypeScript المتعلقة بتحليل المسارات.

**3. تحقق من دقة أسماء المسارات المستعارة (Path Aliases):**

تأكد أن جميع الاستيرادات تستخدم الأسماء المستعارة التالية بشكل صحيح:

- بالنسبة لـ frontend: استخدم `@/*` أو `@shared/*` للوصول إلى المسارات المشتركة
- بالنسبة لـ backend: استخدم `@/*` للوصول إلى شيفرة المصدر

**4. قم بالتحقق النهائي:**

بعد تنفيذ الإصلاحات، شغّل فحصاً شاملاً (`pnpm run typecheck` أو الأمر المكافئ) للتأكد من أن جميع مشاكل الترجمة قد اختفت تماماً. لا تقدم أي تقارير أو جداول زمنية، نفّذ فقط.



بالتأكيد، إليك التقرير محولاً إلى أمر توجيهي مباشر ومختصر لنموذج لغة متخصص في الترميز لتنفيذه فوراً:

---

**أمر توجيهي للتنفيذ الفوري**

بصفتك نموذج لغة متخصص في الترميز، قم بتنفيذ المهام التالية على مشروع The Copy Monorepo فوراً لجعله جاهزاً للبناء (Build-Ready).

**المهمة الأساسية (الأولوية القصوى): إصلاح مسارات الاستيراد المعطلة**

1.  في كل الملفات المذكورة أدناه، قم بتغيير مسار الاستيراد المعطل:
    *   **غير:** `from "../shared/schema"`
    *   **إلى:** `from "./shared/schema"`

2.  الملفات المطلوب إصلاحها هي:
    *   `frontend/src/lib/api.ts`
    *   `frontend/src/app/(main)/directors-studio/shots/page.tsx`
    *   `frontend/src/app/(main)/directors-studio/script/page.tsx`
    *   `frontend/src/app/(main)/directors-studio/scenes/page.tsx`
    *   `frontend/src/app/(main)/directors-studio/lib/api.ts`
    *   `frontend/src/app/(main)/directors-studio/characters/page.tsx`

**المهمة الثانية: توحيد مسارات الاستيراد**

بعد إصلاح المسارات الحرجة، قم بمراجعة شاملة لجميع ملفات المشروع للتأكد من اتساق استخدام مسارات الاستيراد. فضّل استخدام الـ aliases المعرفة في ملف `tsconfig.json` (مثل `@/`, `@shared/`، إلخ) بدلاً من المسارات النسبية (relative paths) wherever possible.

**الهدف النهائي:**

الهدف هو ضمان نجاح عملية البناء (build) للواجهة الأمامية (frontend) والخلفية (backend) دون أخطاء تتعلق بعدم حل الوحدات (module resolution). قم بتشغيل `pnpm build` في الواجهة الأمامية و `tsc` في الخلفية للتحقق من الإصلاحات.

نفّذ الآن.