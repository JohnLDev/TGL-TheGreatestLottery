export const Types = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/LOGIN_FAILURE',
  UPDATE_USER: 'auth/UPDATE_USER',
  LOGOUT: 'auth/LOGOUT',
}

const initialState = {
  isLogged: null,
  token: '',
  user: {},
  error: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        error: '',
        token: action.payload.token,
      }

    case Types.LOGIN_FAILURE:
      return {
        ...state,
        user: {},
        isLogged: false,
        error: action.payload,
      }

    case Types.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLogged: true,
        error: '',
      }
    case Types.LOGOUT:
      return initialState
    default:
      return state
  }
}

export function loginRequest(email, password) {
  return {
    type: Types.LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
  }
}
export function loginSuccess(user, token) {
  return {
    type: Types.LOGIN_SUCCESS,
    payload: {
      user,
      token,
    },
  }
}

export function loginFAilure(error) {
  console.log(error)
  return {
    type: Types.LOGIN_FAILURE,
    payload: error,
  }
}

export function UpdateUser(user) {
  return {
    type: Types.LOGIN_SUCCESS,
    payload: user,
  }
}

export function logout() {
  return {
    type: Types.LOGOUT,
  }
}
