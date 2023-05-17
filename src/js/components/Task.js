import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import { Japanese } from 'flatpickr/dist/l10n/ja.js';
import { useEffect, useState } from 'react';
flatpickr.localize(Japanese);

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      details: this.props.details,
      date: this.props.date,
    };
    //    this.handleClickShowEdit = this.handleClickShowEdit.bind(this);
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleCloseCalender = this.handleCloseCalender.bind(this);

    this.sampleRef = React.createRef();
  }

  handleKeyUpCloseEdit(e) {
    if (e.keyCode === 13 && e.shiftKey === true) {
      this.setState({
        title: e.currentTarget.value,
      });
      this.props.onEnterUpdateTask(
        e.currentTarget.value,
        this.state.details,
        this.state.date
      );
    }
  }
  handleChangeText(e) {
    if (e.target.className === 'editTitle') {
      this.setState({
        title: e.currentTarget.value,
      });
      //editModeがfalseにならないUpdateTaskを追加
      this.props.onChangeUpdateTask(
        e.currentTarget.value,
        this.state.details,
        this.state.date
      );
    } else if (e.target.className === 'editDetails') {
      this.setState({
        details: e.currentTarget.value,
      });
      //editModeがfalseにならないUpdateTaskを追加
      this.props.onChangeUpdateTask(
        this.state.title,
        e.currentTarget.value,
        this.state.date
      );
    } else if (e.target.className === 'editDate') {
      this.setState({
        date: e.currentTarget.value,
      });
    }
  }

  handleCloseCalender(e) {
    //useEffectはトップレベルでないかつReactのバージョンがあっていないので使用できないため、ここではsetTimeOutを使用
    //第二引数(delay)はできるだけ早く実行させるために、指定しない(0s)
    setTimeout(() => {
      this.props.onEnterUpdateTask(
        this.state.title,
        this.state.details,
        this.state.date
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editMode !== this.props.editMode) {
      if (this.props.editMode) {
        this.sampleRef.current.focus();
      }
    }
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.sampleRef.current.focus();
    }
  }

  render() {
    const { onClickToggleDone, onClickRemove, onClickShowEdit } = this.props;

    const classNameLi = ClassNames({
      list__item: true,
      'list__item--done': this.props.isDone,
    });
    const classNameIcon = ClassNames({
      fa: true,
      'fa-circle-thin': !this.props.isDone,
      'fa-check-circle': this.props.isDone,
      'icon-check': true,
      'fa-2x': true,
    });

    const classNameEditTitle = ClassNames({
      editTitle: true,
    });

    const classNameTitle = ClassNames({
      title: true,
    });

    const classNameEditDetails = ClassNames({
      editDetails: true,
    });

    const classNameDetails = ClassNames({
      details: true,
    });

    let stateDate = this.state.date;
    // let preparationTime = stateDate.toLocaleString();
    let preparationTime = (
      stateDate.getFullYear() +
      '年' +
      (stateDate.getMonth() + 1) +
      '月' +
      stateDate.getDate() +
      '日'
    ).toLocaleString();

    const title = this.props.editMode ? (
      <input
        type="text"
        className={classNameEditTitle}
        value={this.state.title}
        ref={this.sampleRef}
        onChange={this.handleChangeText}
        onKeyUp={this.handleKeyUpCloseEdit}
        placeholder="タイトル"
      />
    ) : (
      <div className={classNameTitle}>{this.state.title}</div>
    );
    const details = this.props.editMode ? (
      <textarea
        className={classNameEditDetails}
        rows="1"
        value={this.state.details}
        onChange={this.handleChangeText}
        placeholder="詳細"
      />
    ) : (
      <div className={classNameDetails}>{this.state.details}</div>
    );
    const date = this.props.editMode ? (
      <Flatpickr
        className="editDate"
        value={this.state.date.toLocaleString()}
        onClose={this.handleCloseCalender}
        onChange={([date]) => {
          this.setState({ date });
        }}
      />
    ) : (
      <div className="date">{preparationTime}</div>
    );

    const toggleDone = (e) => {
      e.stopPropagation();
      this.props.onClickToggleDone();
    };

    return (
      <li className="c-todos__list" onClick={onClickShowEdit}>
        <div className="c-todos_list__icon-done">
          <i
            className={classNameIcon}
            onClick={toggleDone}
            aria-hidden="true"
          />
        </div>
        <div className="c-todos_list__input">
          {title}
          {details}
          {date}
        </div>
        <div className="c-todos_list__icon-trash">
          <i
            className="fa fa-trash icon-trash fa-pull-right fa-2x"
            onClick={onClickRemove}
            aria-hidden="true"
          />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  editMode: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  onEnterUpdateTask: PropTypes.func.isRequired,
  onClickToggleDone: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickShowEdit: PropTypes.func.isRequired,
  onChangeUpdateTask: PropTypes.func.isRequired,
};

//TodoListのようにconteinersに分けたりしてないがdispatchする必要がないため、connectはいらない
export default Task;
