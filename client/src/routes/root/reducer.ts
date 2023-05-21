import { RootState, Action } from '../../types/RootState';

export const INITIAL_STATE = {
  username: 'guest',
  hostname: null,
  displayHost: false,
};

export const Reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'setusername':
      return {
        ...state,
        username: action.payload,
      };
    case 'sethostname':
      return {
        ...state,
        hostname: action.payload,
      };
    case 'setdisplayhost':
      return {
        ...state,
        displayHost: action.payload,
      };
    case 'setmultiple':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
