export function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user:       null,
        isFetching: true,
        error:      false,
      };
    case "LOGIN_SUCCES":
      return {
        user:       action.payload,
        isFetching: false,
        error:      false,
      };
      case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        error:      true
      }
    default:
      return state;
  }
}