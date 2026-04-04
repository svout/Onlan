import { useEffect, useRef } from 'react';

/**
 * useEventSource hook
 *
 * @param {string} url - The SSE endpoint
 * @param {Object} handlers - A map of eventName => callback
 * Example:
 *   useEventSource("/api/progress/123", {
 *     progress: (data) => console.log("Progress:", data),
 *     end: (data) => console.log("Completed:", data),
 *   });
 */
export interface EventSourceHandlers<T = any> {
    [eventName: string]: (data: T) => void;
}

export default function useEventSource<T = any>(url: string | null, handlers: EventSourceHandlers<T> = {}) {
    const eventSourceRef = useRef<EventSource | null>(null);
    const handlersRef = useRef(handlers);

    // Keep handlers up to date without re-creating the EventSource
    useEffect(() => {
        handlersRef.current = handlers;
    }, [handlers]);

    useEffect(() => {
        // Close existing connection before opening a new one
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }

        if (!url) return;

        const es = new EventSource(url);
        eventSourceRef.current = es;

        // Attach generic message listener
        Object.entries(handlersRef.current).forEach(([eventName]) => {
            es.addEventListener(eventName, (event) => {
                try {
                    const data = JSON.parse((event as MessageEvent).data);
                    handlersRef.current[eventName]?.(data);
                } catch (err) {
                    console.error('Failed to parse SSE message:', err);
                }
            });
        });

        es.onerror = (err) => {
            console.error('SSE error:', err);
            es.close();
        };

        // Cleanup previous source when unmounting or url changes
        return () => {
            es.close();
            eventSourceRef.current = null;
        };
    }, [url]); // only re-run when URL changes

    return eventSourceRef.current;
}
