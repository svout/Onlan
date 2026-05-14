/**
 * The init script is shipped to the browser as a string and inlined
 * inside a <script> tag at the top of `<body>` via dangerouslySetInnerHTML
 * (see Preloader.tsx). It runs synchronously, BEFORE React hydration.
 *
 * IMPORTANT: We do NOT add classes to `<html>` / `<body>` here — doing so
 * mutates the DOM before React hydrates and causes a mismatch with the
 * server-rendered tree. Scroll lock is handled purely in CSS via
 * `:has(#site-preloader:not(.is-hidden))` in `preloader.css`.
 *
 * Behaviour
 * ---------
 * 1. Waits for `window.load` (all images, fonts, scripts ready).
 * 2. Honours `MIN_DURATION` so the overlay never disappears in a
 *    perceptible flash on instant page loads.
 * 3. Adds the `is-hidden` class to trigger the CSS exit transition, then
 *    leaves the node in the DOM (no `removeChild`) so React’s internal
 *    tree stays consistent — the overlay stays inert via `visibility`,
 *    `pointer-events`, and `opacity` from CSS.
 * 4. Fires a public `preloader:done` event after the exit animation.
 * 5. Has a 12s safety net in case `window.load` never fires.
 *
 * Tunables: MIN_DURATION + EXIT_DURATION must mirror the CSS
 * `--preloader-min-duration` and `--preloader-exit-duration` variables.
 */
export const PRELOADER_INIT_SCRIPT = `(function () {
    'use strict';

    var PRELOADER_ID = 'site-preloader';
    var MIN_DURATION = 2000;
    var EXIT_DURATION = 900;
    var HIDDEN_CLASS = 'is-hidden';

    var startedAt = Date.now();
    var pageLoaded = false;
    var finished = false;

    function tryFinish() {
        if (finished || !pageLoaded) return;
        var elapsed = Date.now() - startedAt;
        var wait = Math.max(0, MIN_DURATION - elapsed);
        window.setTimeout(finish, wait);
    }

    function finish() {
        if (finished) return;
        finished = true;

        var el = document.getElementById(PRELOADER_ID);
        if (!el) {
            return;
        }

        el.classList.add(HIDDEN_CLASS);
        el.setAttribute('aria-hidden', 'true');

        window.setTimeout(function () {
            try {
                document.dispatchEvent(new CustomEvent('preloader:done'));
            } catch (_) {
                var ev = document.createEvent('Event');
                ev.initEvent('preloader:done', true, true);
                document.dispatchEvent(ev);
            }
        }, EXIT_DURATION + 60);
    }

    function onPageLoaded() {
        if (pageLoaded) return;
        pageLoaded = true;
        tryFinish();
    }

    if (document.readyState === 'complete') {
        onPageLoaded();
    } else {
        window.addEventListener('load', onPageLoaded, { once: true });
    }

    // Safety net — leave gracefully even if window.load never fires.
    window.setTimeout(function () { if (!pageLoaded) onPageLoaded(); }, 12000);

    // Reduced motion — collapse the min duration so the overlay leaves fast.
    try {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            MIN_DURATION = 0;
        }
    } catch (_) {}
})();`;
