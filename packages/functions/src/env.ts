import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';

if (process.env.NODE_ENV !== 'production') {

    if (!process.env.CI) {
        const result = dotenv.config({ path: '.env.local' });
        if (result.error) {
            console.error(result.error);
        }
    }
} else {
    const config = Object.entries(functions.config().env ?? {})
        .reduce<Record<string, string>>((o, [ k, v ]) => {
            o[ k.toUpperCase() ] = String(v);

            return o;
        }, {});
    process.env = {
        ...process.env,
        ...config
    };
}

export const requireEnv = (key: keyof typeof process.env) => {
    const val = process.env[ key ];
    if (!val) {
        throw new Error(`Key "${key}" is missing in current env variables (functions config in production). NODE_ENV: ${process.env.NODE_ENV}`);
    }

    return val;
};
