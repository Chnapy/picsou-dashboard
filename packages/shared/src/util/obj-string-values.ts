
export type ObjStringValues<O extends {}> = {
    [K in keyof O]: O[K] extends string ? O[K] : string;
};
