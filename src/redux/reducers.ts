// reducers.ts

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: { category: string; affirmation: string };
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: string;
}

export type AffirmationActions = AddFavoriteAction | RemoveFavoriteAction;

interface AffirmationState {
  affirmations: Record<string, string[]>;
  favorites: { category: string; affirmation: string }[];
  settings: {
    theme: string;
  };
}

const initialState: AffirmationState = {
  affirmations: {
    motivation: [],
    positivity: [],
    selfLove: [],
  },
  favorites: [],
  settings: {
    theme: 'light',
  },
};

const rootReducer = (state = initialState, action: AffirmationActions): AffirmationState => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.affirmation !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
