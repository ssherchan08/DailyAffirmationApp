// src/reducers/actions.ts
import { createAction } from '@reduxjs/toolkit';

export const SET_AFFIRMATION = 'SET_AFFIRMATION';
export const ROLLBACK_AFFIRMATION = 'ROLLBACK_AFFIRMATION';

export const setAffirmation = createAction<any>(SET_AFFIRMATION, (affirmation: any) => ({
  payload: { affirmation },
  meta: {
    offline: {
      effect: {
        type: SET_AFFIRMATION,
        payload: { affirmation },
      },
      rollback: {
        type: ROLLBACK_AFFIRMATION,
      },
    },
  },
}));

export const rollbackAffirmation = createAction(ROLLBACK_AFFIRMATION);
