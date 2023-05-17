import React from 'react';
import { connect } from 'react-redux';
import { addTask, showEdit } from '../actions';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class TodoCreator extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  createHashId() {
    var id = new Date().getTime();
    return id;
  }

  handleCreate() {
    let id = this.createHashId();
    let date = new Date();
    this.props.dispatch(addTask(id, '', '', date));
    this.props.dispatch(showEdit(id));
  }

  render() {
    const ClassNameCreateIcon = ClassNames({
      'fa-solid ': true,
      'fa-plus': true,
    });

    return (
      <div className="c-todo-create-button" onClick={this.handleCreate}>
        <i id="create-icon" className={ClassNameCreateIcon}></i>
        <span className="c-todo-create-button-span">タスクを追加</span>
      </div>
    );
  }
}

TodoCreator.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
//propsに渡す型を指定することで想定外の方で入ってくるのを防ぐことができる
//ここではTodoCreaterコンポーネントを使用するときはpropsで関数型のdispatchを渡すことが必須だという指定になる

export default connect()(TodoCreator);
//これを書くことでactionsと繋がりactionsの関数を使える
