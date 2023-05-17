/**
 * Taskのreducer
 * reducerは受けたactionのタイプをもとに、storeに「新しい」stateを返すだけのもの
 * reducerの中で下記のことはやってはダメ
 * ・引数のstate, actionインスタンスの値を変更する
 * ・副作用をおこす(AjaxでAPIを呼んだり、ルーティングを変えるなどなど確実に実行されるかわからない事をしたらダメ)
 * ・毎回値が変わるもの(Date.now() や Math.random())を扱う
 */
import _ from 'lodash';

// 初期値の設定をしてあげる
const initialState = {
  currentList: 'home',
  lists: ['マイタスク', 'home', '＋新しいリストの作成'],
  todos: [
    {
      listName: 'home',
      id: 0,
      title: 'タイトル',
      details: '詳細',
      date: new Date(),
      editMode: false,
      isDone: false,
      isStar: false,
    },
  ],
  sortMode: 'sortDefault',
};

// action で受け取った値を state に適用して更新する
// reducerはreturnで返却するstateと元のstateの差分があれば、再描画される
// reducer名がそのままstateの名前になる
export default function task(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        currentList: state.currentList,
        lists: state.lists,
        todos: [
          {
            listName: state.currentList,
            id: action.id,
            title: action.title,
            details: action.details,
            date: action.date,
            editMode: true,
            isDone: false,
          },
          ...state.todos,

          //...はstateの中身を展開しているだけなので下記と同じ
          //        {
          //         id: 'XXXX',
          //         text: 'sample todo1',
          //         isDone: false
          //        },
        ],
        sortMode: state.sortMode,
      };
    case 'DELETE':
      return Object.assign({}, state, {
        todos: _.reject(state.todos, { id: action.id }),
      });

    case 'UPDATE':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              title: action.title,
              details: action.details,
              date: action.date,
              editMode: false,
            });
          }
          return todo;
        }),
      });
    case 'CHANGE_UPDATE':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              title: action.title,
              details: action.details,
              date: action.date,
              editMode: true,
            });
          }
          return todo;
        }),
      });
    case 'TOGGLE_DONE':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              isDone: !todo.isDone,
              editMode: false,
            });
          }
          return todo;
        }),
      });
    case 'SHOW_EDIT':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              editMode: true,
            });
          }
          return Object.assign({}, todo, {
            editMode: false,
          });
        }),
      });
    case 'SORT':
      if (action.sortMode === 'sortDate') {
        return Object.assign({}, state, { sortMode: 'sortDate' });
      } else if (action.sortMode === 'sortCreated') {
        return Object.assign({}, state, { sortMode: 'sortCreated' });
      } else if (action.sortMode === 'sortDefault') {
        return Object.assign({}, state, { sortMode: 'sortDefault' });
      }
    case 'ALL_CLOSE':
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          return Object.assign({}, todo, {
            editMode: false,
          });
        }),
      });
    case 'CREATE_LIST':
      let indexToInsert = state.lists.length - 1;
      let newLists = state.lists;
      newLists.splice(indexToInsert, 0, action.listName);
      return Object.assign({}, state, {
        currentList: action.listName,
        lists: newLists,
      });
    case 'CHANGE_CURRENT_LIST':
      return Object.assign({}, state, { currentList: action.currentList });
    default:
      return state;
  }
}
