Worktree-1: محلل بنية المشروع ومسارات الاستيراد الحرجة
التخصص: Project Structure & Critical Import Path Analyst
المهام المخصصة:

TODO-1: إصلاح مسار shared/schema في الملفات الستة الحرجة
TODO-2: التحقق اليدوي من صحة المسار بعد التعديل

التفاصيل التنفيذية:
قم بتحليل شامل لبنية المجلدات في المشروع وركز على المسارات المكسورة الحرجة. في الملفات الستة المحددة استبدل كل ظهور لـ from "../shared/schema" إلى from "./shared/schema":
الملفات المستهدفة:

frontend/src/lib/api.ts
frontend/src/app/(main)/directors-studio/shots/page.tsx
frontend/src/app/(main)/directors-studio/script/page.tsx
frontend/src/app/(main)/directors-studio/scenes/page.tsx
frontend/src/app/(main)/directors-studio/lib/api.ts
frontend/src/app/(main)/directors-studio/characters/page.tsx

إجراءات الفحص:

تأكد من وجود ملف shared/schema في نفس مستوى كل ملف بعد التعديل
إن لم يكن موجوداً، عدّل المسار وفق البنية الفعلية
سجّل حالة إنجاز كل ملف: ✓ تم إصلاح [اسم الملف]
الهدف: إزالة أخطاء module resolution نهائياً

معيار الإنجاز: جميع الملفات الستة تحتوي على مسارات صحيحة وقابلة للحل

Worktree-2: محلل الاعتماديات والحزم ومدير التثبيت
التخصص: Dependency & Package Installation Manager
المهام المخصصة:

TODO-5 (جزء أول): تثبيت الاعتماديات في Frontend
TODO-6 (جزء أول): تثبيت الاعتماديات في Backend

التفاصيل التنفيذية:
في مجلد Frontend:
bashcd frontend
pnpm install
في مجلد Backend:
bashcd backend
pnpm install
التحليل المطلوب:

فحص ملفات package.json في كلا المجلدين
تحديد أي حزم غير مستخدمة أو ذات إصدارات قديمة
رصد أي تحذيرات أثناء التثبيت
توثيق أي ثغرات أمنية مكتشفة
اقتراح حزم بديلة أكثر أماناً أو أداءً عند الحاجة

معيار الإنجاز:

نجاح تثبيت جميع الاعتماديات بدون أخطاء
توثيق كامل لحالة الحزم والتحذيرات


Worktree-3: منظّم الكود والاستيرادات في Frontend
التخصص: Frontend Code & Import Organizer
المهام المخصصة:

TODO-3: توحيد الاستيرادات في الواجهة الأمامية

التفاصيل التنفيذية:
نطاق المراجعة:

frontend/src/lib/**
frontend/src/app/**
أي مجلدات مشتركة في frontend/src

المطلوب:
استبدال المسارات النسبية العميقة:

../../../lib/... → @/lib/...
../../components/... → @/components/...
أي مسارات معقدة أخرى → Aliases معرّفة في tsconfig.json

ضوابط التنفيذ:

عدم تغيير المنطق البرمجي
الإبقاء على نفس الوحدات المستوردة
الحفاظ على اتساق النمط داخل الملف الواحد
التأكد من توافق الـ aliases مع إعدادات tsconfig.json

معيار الإنجاز:

جميع الاستيرادات في Frontend تستخدم Path Aliases
لا توجد مسارات نسبية عميقة (../../..)


Worktree-4: منظّم الكود والاستيرادات في Backend
التخصص: Backend Code & Import Organizer
المهام المخصصة:

TODO-4: توحيد الاستيرادات في الخلفية

التفاصيل التنفيذية:
نطاق المراجعة:

backend/src/services/**
backend/src/types/**
جميع المجلدات في backend/src

المطلوب:
استبدال المسارات النسبية:

../../services/... → @/services/...
../types/... → @/types/...
أي مسارات معقدة → Aliases معتمدة

ضوابط التنفيذ:

التأكد من توافق المسارات مع tsconfig.json الخاص بـ Backend
بقاء الـ imports صالحة بعد التعديل
عدم إدخال مسارات غير موجودة
الحفاظ على السلوك الوظيفي

معيار الإنجاز:

جميع الاستيرادات في Backend تستخدم Path Aliases
توافق كامل مع إعدادات TypeScript


Worktree-5: مدقق الأنواع ومحلل أخطاء Frontend
التخصص: Frontend Type Checker & Build Analyst
المهام المخصصة:

TODO-5 (جزء ثاني): تشغيل فحص الأنواع والبناء في Frontend
TODO-7 (جزء أول): الفحص النهائي للأنواع في Frontend

التفاصيل التنفيذية:
الأوامر المطلوبة (بالترتيب):
bashcd frontend
pnpm typecheck
pnpm build
إجراءات معالجة الأخطاء:
عند ظهور أي خطأ:

سجّل: اسم الملف + رقم السطر + رسالة الخطأ كاملة
عدّل الشيفرة لإزالة الخطأ دون تغيير المنطق
أعد تشغيل الأمر الفاشل
كرر حتى النجاح الكامل

الفحص النهائي:

بعد إكمال جميع الإصلاحات، أعد تشغيل pnpm typecheck
تأكيد اختفاء جميع الأخطاء نهائياً

معيار الإنجاز:

نجاح pnpm typecheck بدون أخطاء
نجاح pnpm build بدون أخطاء


Worktree-6: مدقق الأنواع ومحلل أخطاء Backend
التخصص: Backend Type Checker & Compilation Analyst
المهام المخصصة:

TODO-6 (جزء ثاني): تشغيل فحص الأنواع في Backend
TODO-7 (جزء ثاني): الفحص النهائي للأنواع في Backend

التفاصيل التنفيذية:
الأوامر المطلوبة:
bashcd backend
tsc --noEmit
إجراءات معالجة الأخطاء:
عند ظهور أخطاء TypeScript:

سجّل: الملفات المتأثرة + أرقام الأسطر + رسائل الأخطاء كاملة
أصلح تعريفات الأنواع أو مسارات الاستيراد
عالج التواقيع (signatures) المسببة للفشل
أعد تشغيل tsc --noEmit
كرر حتى النجاح الكامل

الفحص النهائي:

أعد تشغيل tsc --noEmit بعد كل الإصلاحات
تأكيد عدم وجود أي أخطاء ترجمة

معيار الإنجاز:

نجاح tsc --noEmit بدون أي خطأ


Worktree-7: محلل الاعتماديات الدائرية والمخاطر
التخصص: Circular Dependencies & Risk Analyst
المهام المخصصة:

TODO-8: تحليل الاعتماديات الدائرية في المسارات الحرجة

التفاصيل التنفيذية:
نطاق الفحص:

frontend/src/lib/drama-analyst/orchestration/
frontend/src/lib/api.ts
backend/src/services/

المطلوب:
اكتشاف حالات الاعتماد الدائري:

الملف A يستورد من B
الملف B يستورد من A (مباشرة أو عبر سلسلة)

الحلول المقترحة عند اكتشاف دورة:

نقل الأنواع المشتركة إلى ملف مستقل
فصل الوظائف المشتركة في وحدات محايدة
إعادة تنظيم الاستيرادات بشكل هرمي
كسر الحلقة مع الحفاظ على السلوك الوظيفي

التحليل الإضافي:

رصد نقاط الفشل المحتملة أثناء إعادة الهيكلة
تحديد التبعيات المتضاربة
اقتراح خطة rollback لكل تغيير رئيسي
تحديد نقاط توقف آمنة للاستعادة

معيار الإنجاز:

توثيق جميع الاعتماديات الدائرية المكتشفة
تنفيذ أو اقتراح حلول لكسر الحلقات
وجود خطة تنازل (rollback) واضحة


Worktree-8: منسق التوثيق والتقرير النهائي
التخصص: Documentation Coordinator & Final Reporter
المهام المخصصة:

TODO-9: إنشاء ملف توثيق FIXES_APPLIED.md
TODO-10: الالتزام برسائل Git واضحة
TODO-11: الالتزام ببروتوكول التنفيذ العام

التفاصيل التنفيذية:
محتوى ملف FIXES_APPLIED.md (في جذر المشروع):
markdown# تقرير الإصلاحات المطبقة على المشروع

## قائمة الملفات المعدّلة
[قائمة شاملة بكل ملف تم تعديله]

## نوع التعديلات لكل ملف
- الملف X: تصحيح مسار استيراد
- الملف Y: استبدال مسار نسبي بـ alias
- الملف Z: إصلاح نوع TypeScript

## حالة البناء النهائية

### Frontend
- نتيجة `pnpm typecheck`: [نجح/فشل + التفاصيل]
- نتيجة `pnpm build`: [نجح/فشل + التفاصيل]

### Backend
- نتيجة `tsc --noEmit`: [نجح/فشل + التفاصيل]

## المشاكل المتبقية (إن وجدت)
[قائمة مختصرة + أسباب عدم الحل في هذه الجولة]

## الاعتماديات الدائرية
[ملخص الاعتماديات المكتشفة والحلول المطبقة]

## التوصيات للمستقبل
[اقتراحات لتحسين بنية المشروع]
إدارة Git Commits (إن كان متاحاً):
قم بإنشاء commits منطقية منفصلة:
bashgit commit -m "fix: correct import paths in directors-studio files"
git commit -m "chore: unify import aliases in frontend"
git commit -m "chore: unify import aliases in backend"
git commit -m "fix: resolve TypeScript type errors in frontend"
git commit -m "fix: resolve TypeScript type errors in backend"
git commit -m "refactor: break circular dependencies"
git commit -m "docs: add comprehensive fixes report"
بروتوكول التنفيذ:

تنفيذ جميع TODO من 1-10 بالترتيب
إكمال كل ملف/مجموعة بالكامل قبل الانتقال
عدم إنشاء جداول زمنية أو خطط تقديرية
حل كل خطأ فوراً قبل المتابعة
التنفيذ المستمر بدون توقف غير ضروري

معيار الإنجاز:

وجود ملف FIXES_APPLIED.md محدّث وشامل
نجاح بناء Frontend بدون أخطاء
نجاح ترجمة Backend بدون أخطاء
commits واضحة ومنطقية (إن أمكن)


خارطة التنفيذ الشاملة
المرحلة الأولى (Worktrees 1-2):

إصلاح المسارات الحرجة
تثبيت الاعتماديات

المرحلة الثانية (Worktrees 3-4):

توحيد استيرادات Frontend
توحيد استيرادات Backend

المرحلة الثالثة (Worktrees 5-6):

فحص أنواع وبناء Frontend
فحص أنواع وترجمة Backend

المرحلة الرابعة (Worktrees 7-8):

تحليل الاعتماديات الدائرية
التوثيق والتقرير النهائي

