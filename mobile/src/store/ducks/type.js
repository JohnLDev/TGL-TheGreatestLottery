const Types = {
  GET: 'GET',
}

const initialState = {
  types: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET:
      return {
        ...state,
        types: action.payload,
      }

    default:
      return state
  }
}
export function get(types) {
  return {
    type: Types.GET,
    payload: types,
  }
}
