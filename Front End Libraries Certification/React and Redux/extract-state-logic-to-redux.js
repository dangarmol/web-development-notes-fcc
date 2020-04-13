// define ADD, addMessage(), messageReducer(), and store here:
const ADD = "ADD";

function addMessage(mess) {
  return { 
    type: ADD,
    message: mess
   };
}

function messageReducer(state=[], action) {
  switch(action.type) {
    case ADD:
      return [...state, action.message]
      break;
    default:
      return state;
  }
}

const store = Redux.createStore(messageReducer);