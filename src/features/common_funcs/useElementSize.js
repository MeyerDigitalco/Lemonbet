import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useElementSize() {
    const elementRef = useRef(null);
    const frameRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const measure = useCallback((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
    }, []);

    const setRef = useCallback((node) => {
        elementRef.current = node;
        if (node) {
            // initial sync check after mount
            measure(node);
        }
    }, [measure]);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        const el = elementRef.current;
        if (!el || typeof ResizeObserver === 'undefined') return;

        let lastW = -1;
        let lastH = -1;

        const ro = new ResizeObserver((entries) => {
            const entry = entries[0];
            const cr = entry?.contentRect;
            if (!cr) return;

            // avoid unnecessary updates
            if (cr.width === lastW && cr.height === lastH) return;
            lastW = cr.width;
            lastH = cr.height;

            if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(() => {
                setSize({ width: Math.round(cr.width), height: Math.round(cr.height) });
            });
        });

        ro.observe(el);

        // in case the first resize observer event doesn't come
        measure(el);

        return () => {
            if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
            ro.disconnect();
        };
    }, [measure]);

    return { ref: setRef, ...size };
}
