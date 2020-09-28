
declare module 'optional-require' {

    type Opt =
        & {
            message?: string;
            fail?: (e: object) => any;
        }
        & (
            | { notFound?: (e: object) => any }
            | { default?: any }
        );

    type OptOrString = Opt | string;

    declare function optionalRequire(callerRequire: NodeRequire): {
        (path: string, message?: OptOrString): any;
        resolve(path: string, message?: OptOrString): any;
        try(callerRequire: NodeRequire, path: string, message?: OptOrString): any;
        tryResolve(callerRequire: NodeRequire, path: string, message?: OptOrString): any;
        resolve(callerRequire: NodeRequire, path: string, message?: OptOrString): any;
        log(message: string, path: string): void;
    };

    export = optionalRequire;
}
