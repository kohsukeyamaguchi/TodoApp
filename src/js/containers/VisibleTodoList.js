import { connect } from 'react-redux'
import { toggleDone, showEdit, deleteTask, updateTask, allCloseEdit, changeUpdateTask } from '../actions'
import TodoList from '../components/TodoList';

//containersで定義されるお決まり1
//mapStateToPropsを実際に使う時にアロー関数の引数でstateが渡される。
const mapStateToProps = state => {
  return {
    // state.reducer名.プロパティになるので注意！！
    todos:  state.task.todos,
    sortMode: state.task.sortMode,
    currentList: state.task.currentList
  }
};

//containersで定義されるお決まり2
//mapDispatchToPropsを実際に使う時にアロー関数の引数でdispatchが渡される。
const mapDispatchToProps = dispatch => {
  return {
    //プロパティ名:関数
    //の形でTodoListで使用するものを定義している
    //dispatchとすることで、actionsで定義したreducersでstoresのstateを操作するactiongが呼び出せる
    onClickToggleDone: id => {
      dispatch(toggleDone(id));
    },
    onClickShowEdit:id => {
      dispatch(showEdit(id));
    },
    onClickRemove: id => {
      dispatch(deleteTask(id));
    },
    onEnterUpdateTask: (id, title, details, date) => {
      dispatch(updateTask(id, title, details, date));
    },
    onClickAllClose: () => {
      dispatch(allCloseEdit());
    },
    onChangeUpdateTask: (id, title, details, date) => {
      dispatch(changeUpdateTask(id, title, details, date));
    }
  }
};

// connect(state, action)(App（コンポーネント）)
// stateを直接propsとして渡す場合
// connect(state => state)(Task);
//TodoListでmapStateToProps,mapDispatchToProps内で定義したstateやaction関数を使用するため、connect関数に引数で渡さないといけない
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

//componentsのファイルが冗長になる可能性がある場合は,storesのstateデータを変更する関数の定義をcontainerに分けてあげる