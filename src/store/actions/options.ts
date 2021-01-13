import {
  STATUS
} from '../constants/options';

export const setStatus = (data) => {
  return {
    type: STATUS,
    data
  }
}