import React from 'react';
import Lists from '../components/Lists';
import TodoCreator from '../components/TodoCreater';
import Settings from '../components/Settings';
import VisibleTodoList from '../containers/VisibleTodoList';
class TodoApp extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="c-todoapp">
        <Lists />
        <div className="c-create-setting-items">
            <TodoCreator />
            <Settings />
        </div>
        <VisibleTodoList />
      </div>
    );
  }
}

export default TodoApp
