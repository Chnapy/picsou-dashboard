import React from 'react';

export type GainUnit = 'euro' | 'percent';

const initialValue: GainUnit = 'percent';

const valueContext = React.createContext<GainUnit>(initialValue);
const dispatchContext = React.createContext<(v: GainUnit) => void>(() => { });

export const gainUnitContext = {
    Provider: (({ deps, children }) => {
        const [ value, setValue ] = React.useState<GainUnit>(initialValue);

        return <valueContext.Provider value={value}>
            <dispatchContext.Provider value={setValue}>
                {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
                {React.useMemo(() => children, deps)}
            </dispatchContext.Provider>
        </valueContext.Provider>;
    }) as React.FC<{ deps: unknown[] }>,
    useValue: () => React.useContext(valueContext),
    useDispatch: () => React.useContext(dispatchContext)
};
