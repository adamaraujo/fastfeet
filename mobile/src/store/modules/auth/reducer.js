import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.signed = true;
      });
    case '@auth/SIGN_OUT':
      return produce(state, (draft) => {
        draft.signed = false;
      });
    default:
      return state;
  }
}
