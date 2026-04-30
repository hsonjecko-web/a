# خطة الإصلاحات المطلوبة - نظام التميز

## ✅ الملفات التي تم التحقق منها وتعمل بشكل صحيح:

| الملف | الحالة | الملاحظات |
|-------|--------|----------|
| TODO.md | مكتمل ✅ | التصميم المتجاوب بالكامل |
| TODO_RESPONSIVE_FIX.md | مكتمل ✅ | |
| TODO_CUSTOMERS_FIX.md | مكتمل ✅ | customers.html تم إصلاحه |
| api/config.php | مكتمل ✅ | CORS تم إصلاحه |
| api/get_data.php | مكتمل ✅ | يستخدم user_id |
| daily_sales_report.html | مكتمل ✅ | يستخدم s.total |
| monthly_sales_report.html | مكتمل ✅ | القيمة الافتراضية موجودة + s.total |
| daily_payments_report.html | مكتمل ✅ | sidebar موجود |
| monthly_payments_report.html | مكتمل ✅ | القيمة الافتراضية موجودة |
| daily_dues_report.html | مكتمل ✅ | sidebar موجود |
| monthly_dues_report.html | مكتمل ✅ | القيمة الافتراضية موجودة |

---

## ❌ الملفات التي تتطلب إصلاحات:

### 1. sw.js - مسارات خاطئة
**المشكلة:** يستخدم `/a/` بدلاً من المسار الجذري `/`

### 2. TODO_PERMISSIONS_FIX.md - صلاحيات غير مطبقة
**المتبقي:**
- ≈25 صفحة تحتاج إضافة auth.js وتطبيق filterDataByUser()
- صفحات التعديل/العرض تحتاج التحقق من الملكية

### 3. TODO_ONLINE_OFFLINE_SYNC.md - لا يوجد مزامنة
**المتبقي:**
- Server-first غير مطبق
- localStorage يُستخدم للحفظ المباشر

---

## خطة الإصلاح:

### الخطوة 1: إصلاح sw.js
- تغيير `/a/` إلى `/`

### الخطوة 2: تطبيق الصلاحيات (TODO_PERMISSIONS_FIX.md)
- ≈25 صفحة تحتاج تعديل

### الخطوة 3: المزامنة (TODO_ONLINE_OFFLINE_SYNC.md)
- Server-first لجميع عمليات الحفظ

---

## ملاحظات:
- التقارير (reports) تعمل بشكل صحيح وليس هناك مشكلة في sidebar/overlay كما هو مكتوب
- monthly_payments_report.html لا يحتوي على stray tags كما هو مفترض
