
export type Normalizable<I extends string | number> = {
    id: I;
};

export type NormalizeObject<O extends Normalizable<any>> = {
    [ k in O[ 'id' ] ]: O;
};

export type NormalizeArray<O extends Normalizable<any>> = O[ 'id' ][];

// export type Normalized<KO extends string, KA extends string, O extends Normalizable<any>> =
//     & {
//         [ ko in KO ]: NormalizeObject<O>;
//     }
//     & {
//         [ ka in KA ]: NormalizeArray<O>;
//     };
