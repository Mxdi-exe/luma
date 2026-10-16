# راهنمای انتشار Luma در GitHub

## متن‌های آماده

نام مخزن: `luma`

Description:

> A Chrome extension designed to help resolve “Country unsupported” errors on Google Flow, with a Persian UI and multi-account path support.

Topics:

`chrome-extension` `google-flow` `browser-extension` `luma` `country-unsupported` `persian`

عنوان Release: `Luma v1.2.0`

متن Release: محتوای فایل `RELEASE-NOTES.md`.

## موارد باقی‌مانده پیش از انتشار عمومی

- حق انتشار کد و دارایی‌ها را تأیید کنید. چند فایل نام‌های CFC Flow دارند؛ منشأ و شرایط مجوز هر کد برگرفته از دیگران را روشن و اطلاعیه‌های لازم را حفظ کنید.
- فایل‌های IRANYekanX مجوز همراه ندارند. مجوز توزیعشان را تأیید و در صورت لزوم اضافه کنید؛ اگر مجوز ندارید، پیش از انتشار با فونتی که اجازه توزیع دارد جایگزین کنید. وجود فایل فونت به‌تنهایی مجوز بازنشر نیست.
- پس از روشن شدن حقوق اجزای پروژه، لایسنس مناسب را انتخاب و فایل LICENSE را با نام درست صاحب اثر اضافه کنید. در این بسته لایسنس دلخواه به شما نسبت داده نشده است.
- مالکیت یا اجازه استفاده از سرور flow.cfcnode.com و سیاست حریم خصوصی آن را مشخص کنید. اگر سرور تحت کنترل شما نیست، آن را در معرفی شفاف نگه دارید.
- روی حساب واقعی Flow نصب، روشن/خاموش، بارگذاری مجدد، مسیر چندحسابی و حالت عدم دسترسی به تنظیمات را امتحان کنید. این موارد در این بررسی فقط از کد مستند شده‌اند.

## ایجاد مخزن و ارسال

۱. در GitHub روی + و سپس New repository بزنید.
۲. نام را luma بگذارید و Description بالا را کپی کنید.
۳. برای انتشار عمومی، Public را انتخاب کنید. ایجاد خودکار README، .gitignore و License را فعال نکنید.
۴. فایل ZIP این بسته را استخراج کنید و ترمینال را داخل پوشه Luma-GitHub، کنار manifest.json، باز کنید.
۵. اگر پروژه هنوز مخزن Git ندارد، دستورهای زیر را اجرا کنید:

```bash
git init
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB EMAIL"
git add .
git status
```

نام و ایمیل واقعی موردنظر خود را جایگزین کنید. ایمیل commit ممکن است عمومی شود؛ می‌توانید ایمیل noreply حساب GitHub را از تنظیمات حسابتان بردارید.

۶. فهرست فایل‌ها را بررسی کنید، سپس USERNAME را در آدرس زیر جایگزین کنید:

```bash
git commit -m "Initial commit: add Luma v1.2.0"
git branch -M main
git remote add origin https://github.com/USERNAME/luma.git
git push -u origin main
```

ممکن است احراز هویت GitHub لازم شود. اگر پروژه قبلاً Git دارد، پیش از تکرار تنظیمات، git status و git remote -v را بررسی کنید.

۷. در بخش About، Topics بالا را اضافه کنید.
۸. پس از انجام بررسی‌های انتشار، از بخش Releases یک Release با تگ v1.2.0 بسازید و متن RELEASE-NOTES.md را وارد کنید.

این آرشیو شامل کد اصلی بدون تغییر و مستندات تازه است. README قبلی با راهنمای فارسی جدید جایگزین شده و خلاصه یادداشت نسخه آن در CHANGELOG.md حفظ شده است. این بسته صرفاً با آماده‌سازی مستندات، عملکرد افزونه را تأیید نمی‌کند.
