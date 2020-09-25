import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// by setting string as variable, JS will tell undefined in case of typo.
const ADD = "ADD";
const MINUS = "MINUS";

number.innerText = 0;

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// before knowing switch
// if (action.type === "ADD") {
//   return count + 1;
// } else if (action.type === "MINUS") {
//   return count - 1;
// } else {
//   return count;
// }

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};
add.addEventListener("click", handleAdd);

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};
minus.addEventListener("click", handleMinus);

// same as below
// add.addEventListener("click", () => {
//   countStore.dispatch({ type: "ADD" });
// });

// minus.addEventListener("click", () => {
//   countStore.dispatch({ type: "MINUS" });
// });

//////////////////////////////////////////////////////////////////////
///////////////////////// Vanilla Redux ToDo /////////////////////////

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//action creator returns object
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id); //used filter rather than splice. Because splice mutates array. Filter creates a new array
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const dispatchAddToDo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({ type: DELETE_TODO, id });
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // otherwise it repeat existing list + new todo
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
