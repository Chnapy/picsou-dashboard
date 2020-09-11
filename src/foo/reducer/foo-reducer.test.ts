import { fooReducer, FooState } from './foo-reducer';
import { FooIncrementAction, FooDecrementAction } from './foo-actions';

describe('# foo-reducer', () => {

    it('should give correct initial state', () => {

        expect(fooReducer(undefined, { type: 'not-matter' }))
            .toEqual<FooState>(0);
    });

    it('should increment on increment action', () => {

        expect(fooReducer(0, FooIncrementAction(3)))
            .toEqual<FooState>(3);
    });

    it('should decrement on decrement action', () => {

        expect(fooReducer(3, FooDecrementAction(2)))
            .toEqual<FooState>(1);
    });
});
