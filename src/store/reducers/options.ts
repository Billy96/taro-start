import { STATUS } from '../constants/options';

const INITIAL_STATE = {
  status: []
};

export default function options (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STATUS:
      return {
        ...state,
        status: action.data
      }
    default:
      return state
  }
}
