import React from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    // Refの定義
    this.modalRef = React.createRef();
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }

  componentDidMount() {
    // EventTargetに全てのClick eventをHandlingできるように登録する
    document.addEventListener('click', this.handleClickEvent);
  }

  componentWillUnmount() {
    // click eventがeventListenerに登録されたままになってしまうのでUnmount時にremoveする
    document.removeEventListener('click', this.handleClickEvent);
  }

  handleClickEvent(event) {
    let domClassNames = [
      'title',
      'details',
      'date',
      'editTitle',
      'editDetails',
      'editDate',
      'c-todo-create-button',
      'c-todo-create-button-span',
    ];
    let eventTargetClassName = event.target.className;
    let eventTargetId = event.target.id;
    if (
      domClassNames.includes(eventTargetClassName) ||
      eventTargetId == 'create-icon'
    ) {
    } else if (
      this.modalRef &&
      this.modalRef.current &&
      this.modalRef.current.contains(event.target)
    ) {
    } else if (
      event.target.closest('.flatpickr-months') ||
      event.target.closest('.flatpickr-weekdays')
    ) {
    } else {
      this.props.onClickAllClose();
    }
  }
  //このファイルでmapStateToPropsでstateをフィルタリングしたtodosの定義やonClickToggleDone, onClickRemove, onEnterUpdateTaskのメソッド等を定義すると、冗長になるのでcontainersのVisibleTodoListファイルに分けている
  render() {
    const {
      todos,
      onClickToggleDone,
      onClickShowEdit,
      onClickRemove,
      onEnterUpdateTask,
      onChangeUpdateTask,
    } = this.props;

    let { sortMode, currentList } = this.props;
    let tasks = [];
    let finishTasks = [];

    if (sortMode === 'sortDate') {
      todos.sort((a, b) => a.date - b.date);
    } else if (sortMode === 'sortCreated') {
      todos.sort((a, b) => a.id - b.id);
    } else if (sortMode === 'sortDefault') {
      todos.sort((a, b) => b.id - a.id);
    }

    for (let i in todos) {
      if (todos[i].isDone === false && todos[i].listName === currentList) {
        tasks.push(
          <Task
            key={todos[i].id}
            {...todos[i]}
            onClickToggleDone={() => onClickToggleDone(todos[i].id)}
            onClickShowEdit={() => onClickShowEdit(todos[i].id)}
            onClickRemove={() => onClickRemove(todos[i].id)}
            onEnterUpdateTask={(title, details, date) =>
              onEnterUpdateTask(todos[i].id, title, details, date)
            }
            onChangeUpdateTask={(title, details, date) =>
              onChangeUpdateTask(todos[i].id, title, details, date)
            }
          />
        );
      } else if (
        todos[i].isDone === true &&
        todos[i].listName === currentList
      ) {
        finishTasks.push(
          <Task
            key={todos[i].id}
            {...todos[i]}
            onClickToggleDone={() => onClickToggleDone(todos[i].id)}
            onClickShowEdit={() => onClickShowEdit(todos[i].id)}
            onClickRemove={() => onClickRemove(todos[i].id)}
            onEnterUpdateTask={(title, details, date) =>
              onEnterUpdateTask(todos[i].id, title, details, date)
            }
            onChangeUpdateTask={(title, details, date) =>
              onChangeUpdateTask(todos[i].id, title, details, date)
            }
          />
        );
      }
    }

    return (
      <div className="lists c-todos" ref={this.modalRef}>
        <ul className="list c-todos__unfinished js-todo_list modal">{tasks}</ul>
        <ul className="finish_list c-todos__finished js-todo_list">
          <li className="c-todos__finished__top">完了</li>
          {finishTasks}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      //shapeは形式を指定する。
      //今回のような例では、todosの中身が下記のようになっていることを指定している
      listName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDone: PropTypes.bool.isRequired,
      editMode: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    }).isRequired
  ).isRequired,
  sortMode: PropTypes.string.isRequired,
  currentList: PropTypes.string.isRequired,
  onClickToggleDone: PropTypes.func.isRequired,
  onClickShowEdit: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onEnterUpdateTask: PropTypes.func.isRequired,
  onClickAllClose: PropTypes.func.isRequired,
  onChangeUpdateTask: PropTypes.func.isRequired,
};

export default TodoList;
//containersを使用する場合は、connect()を使用する必要はない
//今回の場合は、containersであるVisibleTodoListを使用しているため、conenect()はいらない。
