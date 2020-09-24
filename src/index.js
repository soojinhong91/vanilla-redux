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
