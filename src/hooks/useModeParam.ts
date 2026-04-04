import { useEffect, useState, useCallback } from 'react';
import { type SetURLSearchParams } from 'react-router-dom';

export function useModeParam(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams) {
    const queryMode = searchParams.get('mode');
    const [mode, setModeState] = useState<'view' | 'edit'>(queryMode === 'edit' ? 'edit' : 'view');

    useEffect(() => {
        if (queryMode === 'edit' || queryMode === 'view') {
            setModeState(queryMode);
        }
    }, [queryMode]);

    const setMode = useCallback(
        (newMode: 'view' | 'edit') => {
            setModeState(newMode);

            const newParams = new URLSearchParams(searchParams);
            newParams.set('mode', newMode);
            setSearchParams(newParams);
        },
        [searchParams, setSearchParams]
    );

    return { mode, setMode };
}
