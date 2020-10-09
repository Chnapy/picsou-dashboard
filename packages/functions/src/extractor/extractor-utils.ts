import * as functions from 'firebase-functions';
import { URLSearchParams } from 'url';

export const extractorUtils = {

    getOrThrow: <V>(value: V, message?: string): NonNullable<V> => {
        if (value === undefined || value === null) {
            throw new functions.https.HttpsError('invalid-argument', message ?? '');
        }
        return value!;
    },
    commonHeaders: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    createBody: (rawBody: object) => {
        const body = new URLSearchParams();

        Object.entries(rawBody).forEach(([ key, value ]) => body.append(key, value));

        return body;
    }
};
