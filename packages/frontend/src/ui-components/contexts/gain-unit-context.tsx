import React from 'react';

export type GainUnit = 'euro' | 'percent';

const initialValue: GainUnit = 'percent';

const valueContext = React.createContext<GainUnit>(initialValue);
const dispatchContext = React.createContext<(v: GainUnit) => void>(() => { });

export const gainUnitContext = {
    Provider: (({ children }) => {
        const [ value, setValue ] = React.useState<GainUnit>(initialValue);

        return <valueContext.Provider value={value}>
            <dispatchContext.Provider value={setValue}>
                {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
                {React.useMemo(() => children, [])}
            </dispatchContext.Provider>
        </valueContext.Provider>;
    }) as React.FC,
    useValue: () => React.useContext(valueContext),
    useDispatch: () => React.useContext(dispatchContext)
};
