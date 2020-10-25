
const delay = 5 * 60 * 1000;  // every 5 min

type IntervalHandlerParams = {
    clearIfAny: () => void;
    delay: number;
};

export const createIntervalHandler = (fn: (params: IntervalHandlerParams) => void) => {

    let interval: NodeJS.Timeout | null = null;

    const clearIfAny = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };

    const triggerFunction = () => fn({
        clearIfAny,
        delay
    });

    return {
        createOrReplace: () => {
            clearIfAny();
            interval = setInterval(triggerFunction, delay);
        },
        triggerFunction,
        clearIfAny
    };

};
