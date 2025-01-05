// actions.ts

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

export const addFavorite = (category: string, affirmation: string): AddFavoriteAction => ({
  type: ADD_FAVORITE,
  payload: { category, affirmation },
});

export const removeFavorite = (affirmation: string): RemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: affirmation,
});
