export const Types = {
  ADD_REQUEST: 'bet/ADD_REQUEST',
  ADD_SUCCESS: 'bet/ADD_SUCCESS',
  ADD_FAIL: 'bet/ADD_FAIL',
  REMOVE: 'bet/REMOVE',
  FIRST_GET: 'bet/FIRST_GET',
}

const initialState = {
  bets: [],
  error: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FIRST_GET:
      return {
        ...state,
        bets: action.payload,
      }
    case Types.ADD_SUCCESS:
      state.bets.push(action.payload)
      return {
        ...state,
        error: false,
      }
    case Types.ADD_FAIL:
      return {
        ...state,
        error: true,
      }

    case Types.REMOVE:
      return {
        ...state,
        bets: state.bets.filter(bet => bet.id !== action.payload.id),
      }
    default:
      return state
  }
}

export function addRequest({ game, price, numbers, type_id, color }) {
  return {
    type: Types.ADD_REQUEST,
    payload: {
      type_id,
      game,
      price,
      numbers,
      color,
    },
  }
}

export function addSuccess({ id, game, price, numbers, color, date }) {
  return {
    type: Types.ADD_SUCCESS,
    payload: {
      id,
      game,
      price,
      numbers,
      color,
      date,
    },
  }
}
export function addFail() {
  return {
    type: Types.ADD_FAIL,
  }
}

export function FirsGet(bet) {
  return {
    type: Types.FIRST_GET,
    payload: bet,
  }
}

export function remove(id) {
  return {
    type: Types.REMOVE,
    payload: {
      id,
    },
  }
}
