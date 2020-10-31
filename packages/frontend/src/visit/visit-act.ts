import { createAct } from '../main/create-act';
import { VisitEnterAction, VisitLoadDataAction } from './visit-actions';

export const actVisitEnter = createAct(() => async (dispatch) => {
    await dispatch(VisitEnterAction());

    const { getVisitFakeMainBoardData } = await import('./visit-fake-main-board-data');

    const data = getVisitFakeMainBoardData();

    await dispatch(VisitLoadDataAction(data));
});
