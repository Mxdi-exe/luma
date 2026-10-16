# Luma

![Luma icon](assets/luma-icon-128.png)

**A Chrome extension designed to help with the “Country unsupported” error on Google Flow.**

[راهنمای فارسی](README.fa.md) · [Privacy](PRIVACY.md) · [Release notes](CHANGELOG.md)

Luma modifies a matching Google Flow response locally in the browser. It includes a Persian popup for enabling or disabling the helper, checking its status, and reloading the Flow page.

## Features

- Targets `https://flow.google.com/*`.
- Recognizes numeric Google account path segments such as `/u/0/` and `/u/1/` when matching RPC routes.
- Provides an on/off switch and status messages in Persian.
- Provides a reload button that also removes a trailing `/unsupported-country` path when returning to Flow.
- Uses bundled icons and local fonts, with a dark interface and reduced-motion support.

## Requirements

- Chrome 111 or later, as declared in the manifest.
- Access to Google Flow and the remote configuration endpoint described below.
- Any account access or subscription required by Flow itself.

This package contains the extension files directly. No build step or dependency installation is required.

## Install manually

1. Download this repository through **Code → Download ZIP**, then extract it.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted folder containing `manifest.json`.
6. Open or refresh [Google Flow](https://flow.google.com/).

These are developer-mode installation instructions. Publishing source on GitHub does not publish the extension to the Chrome Web Store.

## Use

1. Select a Google Flow tab.
2. Open Luma from Chrome's extensions menu; pin it if desired.
3. Turn on **دسترسی Flow** if it is off.
4. Click **بارگذاری مجدد صفحه** or refresh the Flow tab.
5. Check the popup status after the page loads.

After turning Luma off, refresh the Flow tab to remove the helper already injected into that page. The switch changes script registration for subsequent page loads.

### Status messages

| Popup message | Meaning / next step |
| --- | --- |
| دسترسی روی این صفحه فعال است. | A matching response has been patched on this page. |
| در انتظار پاسخ صفحه… | The helper is ready and waiting for a matching response. |
| در حال آماده‌سازی… | The helper is waiting for configuration. |
| اتصال برقرار نشد؛ دوباره تلاش کنید. | Configuration is unavailable or invalid; try again. |
| افزونه به به‌روزرسانی نیاز دارد. | The response format did not match expectations. |
| صفحه را بارگذاری مجدد کنید. | Refresh the selected Flow tab. |

An “active” status indicates a local patch was applied; it does not confirm that all Flow features work.

## How it works

- `app.js` registers `engine.js` at document start in the page's MAIN world.
- `link.js` obtains configuration from the extension and passes it to the page helper through window messages.
- `engine.js` wraps XMLHttpRequest access and modifies one matching RPC response flag according to that configuration. Numeric `/u/<account>/` segments are normalized when comparing paths.
- `stat.js` exposes a short local diagnostic status to the popup.
- `panel.js` controls script registration, displays status, and reloads or navigates the current Flow tab.

The extension fetches JSON configuration from `https://flow.cfcnode.com/v1/flow-spec`. Its service worker caches successful configuration in memory for up to six hours while that worker remains alive. A worker restart can trigger an earlier fetch. This is an external runtime dependency; the repository does not include its server implementation or guarantee its availability.

## Permissions

| Permission / host | Purpose in this code |
| --- | --- |
| `scripting` | Register, inspect, and unregister the Flow helper script. |
| `https://flow.google.com/*` | Run the helper and communicate with content scripts on Flow pages. |
| `https://flow.cfcnode.com/*` | Retrieve the remote JSON configuration. |

See [PRIVACY.md](PRIVACY.md) for data handling and review limits.

## Limitations

Luma targets the client-side behavior implemented here. It is not a VPN and does not change your public IP address. It does not grant a subscription or account entitlement. Server-side restrictions and changes to Google Flow may prevent it from working.

Some JavaScript in the supplied source is obfuscated. This repository retains those files unchanged. This package has been checked statically; successful access to a live Flow account has not been verified.

## Troubleshooting and bug reports

Confirm that Luma is enabled, has site access to Flow, and that the tab was refreshed after toggling or updating the extension. Check the extension's Errors section in `chrome://extensions`.

If the issue persists, open an Issue with the exact error, steps to reproduce, Chrome version, Luma version, and whether you use an account-specific path. Redact account identifiers, cookies, tokens, and personal information from screenshots and logs.

## Contributing

Bug reports and pull requests are welcome. Explain the behavior being changed and how you tested it. Discuss substantial changes in an Issue first.

## License and attribution

A project license has not yet been selected. Public availability alone does not provide a general license to reuse the code or assets. The bundled IRANYekanX font files have no accompanying license in the supplied archive; confirm redistribution rights before publishing them. Existing `CFC Flow` identifiers in the code are retained; their presence alone does not establish authorship or licensing. Preserve applicable third-party notices.

Luma is an independent project and is not affiliated with or endorsed by Google.
