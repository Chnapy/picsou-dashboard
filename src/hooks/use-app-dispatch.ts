import { PayloadActionCreator } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

type Params = {
    [ K in string ]: PayloadActionCreator<any> | (
        (...args: unknown[]) => ReturnType<PayloadActionCreator<any>>
    );
};

type Return<P extends Params> = {
    [ K in keyof P ]: (...args: Parameters<P[ K ]>) => Promise<unknown>;
};

export const useAppDispatch = <P extends Params>(map: P): Return<P> => {

    const dispatch = useDispatch();

    return Object.entries(map)
        .reduce((arr: any, [ key, value ]) => {

            arr[ key ] = (...args: unknown[]) => dispatch((value as any)(...args));

            return arr;
        }, {}) as Return<P>;
};
