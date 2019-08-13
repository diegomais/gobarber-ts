import produce from 'immer';

const initialState = {
  profile: null,
};

export default (state = initialState, { type, payload }) => {
  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
};
