import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TodoApp from './components/ToDoApp'
import rootReducer from './reducers'

// reducerを指定して、storeを生成
export let store = createStore(rootReducer);

ReactDOM.render(
  // Provider配下のコンポーネントに以下のstoreのメソッドが渡される
  // store={dispatch(), getState(), subscribe()}
  // これでTodoApp内でstoreが使えるようになる
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);