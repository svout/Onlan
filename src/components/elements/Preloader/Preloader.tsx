/**
 * Premium fullscreen preloader.
 *
 * Renders a fixed, top-most overlay that splits the viewport into the
 * Onlan brand colours along a 15° tilted diagonal divider. The brand
 * mark is centred in solid white, matching `PreloaderLogo.svg`.
 *
 * This is a server component — the markup is in the very first byte
 * of HTML the user receives, so the preloader paints on first frame
 * with zero FOUC and zero hydration wait.
 *
 * Drop into your root layout as the FIRST child of <body>:
 *
 *   <body>
 *       <Preloader />
 *       ...rest of the app...
 *   </body>
 *
 * The init script (inlined synchronously below the markup) handles
 * load timing and applies `is-hidden` after the exit transition. The
 * overlay node is never removed from the DOM so React reconciliation
 * stays valid (imperative `removeChild` caused insertBefore crashes).
 */

import './preloader.css';

import { PreloaderLogo } from './PreloaderLogo';
import { PRELOADER_INIT_SCRIPT } from './preloader-init';

export function Preloader() {
    return (
        <>
            <div
                id="site-preloader"
                className="preloader"
                role="status"
                aria-live="polite"
                aria-label="Loading"
            >
                <div
                    className="preloader__bg preloader__bg--lime"
                    aria-hidden="true"
                />
                <div className="preloader__inner">
                    <div className="preloader__logo">
                        <PreloaderLogo className="preloader__logo-svg" />
                    </div>
                </div>
            </div>
            {/*
                Inline, synchronous init script. Runs immediately when the
                browser parses this point in the document — no `defer`, no
                `async`, no React hydration required.
            */}
            <script
                dangerouslySetInnerHTML={{ __html: PRELOADER_INIT_SCRIPT }}
            />
        </>
    );
}
