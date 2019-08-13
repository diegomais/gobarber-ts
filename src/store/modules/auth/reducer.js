import produce from 'immer';

const initialState = {
  token: null,
  signed: false,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
