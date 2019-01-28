export default function userReducer(state = {currentUser: {}}, action){
  switch(action.type){
    case "LOGIN":
    return {...state, currentUser: action.user};

    default:
    return state
  }
}
