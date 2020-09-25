## Install & Import Redux

```
npm install redux
import { createStore } from 'redux'
```

##

- `const store = createStore(reducer)`
  createStore is a place where to put state. This expects reducer(as a function type). // reducer or usually named '~~modifier'

- `const reducer = (state, action) => { //how you want to modify }`
  Reducer is a function that modifies data(state).
  Whatever reducer returns, that return value will be the new state. (Only this can change state.)
  Reducer is called with current state & action

  - action: second parameter/argument that redux takes
    `.dispatch(action)` action is the way how to communicate with reducer by sending action to reducer. Dispatch will call reducer with current state + action just sent. Action must be object(no string!), and this object must have 'type' as key (otherwise it complains "Actions may not have an undefined 'type' property").

    `.subscribe()` allows us to listen to the changes in our store.

### NEVER Mutate State

: Don't mutate(ex. '.push()'), return new state objects

- Three Principles in Redux (https://redux.js.org/introduction/three-principles)
  1. Single source of truth
  2. State is read-only
  3. Changes are made with pure functions
