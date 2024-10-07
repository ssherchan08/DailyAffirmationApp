
import { SET_AFFIRMATION, ROLLBACK_AFFIRMATION } from './actions';

const initialState = {
  affirmation: '',
  history: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AFFIRMATION:
      return {
        ...state,
        affirmation: action.payload.affirmation,
        history: [...state.history, action.payload.affirmation],
      };
    case ROLLBACK_AFFIRMATION:
      return {
        ...state,
        affirmation: '',
      };
    default:
      return state;
  }
};

export default rootReducer;
