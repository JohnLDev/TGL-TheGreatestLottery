export const Types = {
  ADD: 'CART/ADD',
  REMOVE: 'CART/REMOVE',
  CLEAR: 'CART/CLEAR',
}

const initialState = {
  betsInCart: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD:
      state.betsInCart.push(action.payload)
      return {
        ...state,
      }

    case Types.REMOVE:
      return {
        ...state,
        betsInCart: state.betsInCart.filter(bet => bet.id !== action.payload),
      }

    case Types.CLEAR:
      return {
        ...state,
        betsInCart: [],
      }

    default:
      return state
  }
}

export function AddItemToCart(item) {
  return {
    type: Types.ADD,
    payload: item,
  }
}

export function RemoveItemFromCart(id) {
  return {
    type: Types.REMOVE,
    payload: id,
  }
}

export function ClearCart() {
  return {
    type: Types.CLEAR,
  }
}
