
export type Normalizable<I extends string | number> = {
    id: I;
};

export type NormalizeObject<O extends Normalizable<any>> = {
    [ k in O[ 'id' ] ]: O;
};

export type NormalizeArray<O extends Normalizable<any>> = O[ 'id' ][];

export const normalize = <O extends Normalizable<any>>(arr: O[]) => arr.reduce((acc, v) => {
    (acc as any)[ v.id ] = v;
    return acc;
}, {} as NormalizeObject<O>);

export const denormalize = <O extends Normalizable<any>>(o: NormalizeObject<O>): O[] => Object.values(o);
