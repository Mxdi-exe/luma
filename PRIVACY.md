# Luma — data handling notes

Scope: the supplied extension source, manifest version **1.2.0**, reviewed statically on **2026-10-16**. These notes describe the inspected client code; they are not a complete audit of obfuscated code, remote infrastructure, Google Flow, or future versions.

## Local processing

The helper reads and modifies a matching Flow XMLHttpRequest response in the page. Diagnostic information includes a state string, an applied-patch count, and the previous flag value. It is exposed on the page through a window property / DOM attribute and written to the browser console. The status content script returns a shortened state and an applied/not-applied result to the popup.

The popup queries the active tab to recognize Flow and can reload or navigate that tab when the user clicks its reload button. The on/off setting is represented by Chrome's persistent content-script registration. Configuration is cached in service-worker memory; the reviewed implementation does not use chrome.storage for it.

## External connections

The service worker fetches JSON configuration from:

`https://flow.cfcnode.com/v1/flow-spec`

The request has no explicit application-data body. As with an ordinary HTTPS request, the receiving server and its infrastructure can observe connection metadata such as the source IP address and request time. Server ownership, logging, retention, and deletion policies cannot be determined from this archive.

Google Flow continues to make its own requests under Google's policies. This file does not describe or override Google's data handling.

## Review findings and limits

No explicit analytics SDK, advertising integration, or code path that uploads prompts, cookies, account tokens, or Flow response bodies to the configuration endpoint was identified in this static review. This is a limited observation, not a guarantee of zero data collection. Some JavaScript is obfuscated, and the remote endpoint and live browser behavior have not been audited.

The popup's fonts and images are bundled locally. The reviewed CSS does not fetch fonts from a remote font service.

## Disable or remove

Turn off Luma in its popup and refresh existing Flow tabs, or remove it through `chrome://extensions`. A script already injected into a page remains until that page is reloaded or closed.

## فارسی

این متن بر اساس بررسی ایستای نسخه ۱.۲.۰ نوشته شده است. افزونه پاسخ مشخص Flow را داخل مرورگر پردازش می‌کند و وضعیت کوتاهی را در صفحه و کنسول نگه می‌دارد. برای دریافت تنظیمات به `flow.cfcnode.com` درخواست می‌فرستد؛ سرور می‌تواند اطلاعات معمول اتصال مانند IP و زمان درخواست را ببیند. مالکیت سرور، سیاست ثبت و مدت نگهداری اطلاعات از روی این کد مشخص نیست.

در بررسی ایستا مسیر صریحی برای ارسال پرامپت، کوکی، توکن حساب یا متن پاسخ Flow به سرور تنظیمات شناسایی نشد؛ این مشاهده تضمین نبود جمع‌آوری اطلاعات نیست. بخشی از کد مبهم‌سازی شده و سرور یا رفتار مرورگر واقعی ممیزی نشده است. فونت‌ها و تصاویر رابط از فایل‌های محلی بارگذاری می‌شوند.

برای غیرفعال‌سازی کامل در تب باز، سوییچ را خاموش و صفحه Flow را تازه‌سازی کنید، یا افزونه را از صفحه مدیریت اکستنشن‌های کروم حذف کنید.
