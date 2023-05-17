import React from 'react';
import { connect } from 'react-redux'
import { sortTask } from '../actions';
import ClassNames from 'classnames';
import PropTypes from "prop-types";

class Settings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        settingsShow: false
    };
      
    this.modalRef = React.createRef();
    this.handleSort = this.handleSort.bind(this);
    this.handleChangeShow = this.handleChangeShow.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }
    
  componentDidMount() {
    // EventTargetに全てのClick eventをHandlingできるように登録する
    document.addEventListener('click', this.handleClickEvent)
  }

  componentWillUnmount() {
    // click eventがeventListenerに登録されたままになってしまうのでUnmount時にremoveする
    document.removeEventListener('click', this.handleClickEvent)
  }

  handleClickEvent(event) {
      let domIdNames = ["setting-form","setting-title","setting-div","setting-icon"]
      let eventTargetId = event.target.id;
    if(domIdNames.includes(eventTargetId)){
        
    }else {
        this.setState({
            settingsShow: false
        });
    }
  }
    
  handleSort(e){
      if(e.target.id === "sortDate"){
          this.props.dispatch(sortTask('sortDate'));
      }else if(e.target.id === "sortCreated"){
          this.props.dispatch(sortTask('sortCreated'));
      }else if(e.target.id === "sortDefault"){
          this.props.dispatch(sortTask('sortDefault'));
      }
  }

  handleChangeShow(){
    this.setState({
        settingsShow: true
    });
  }
 
  render() {
      
    const ClassNameIcon = ClassNames({
       'fa-solid': true,
       'fa-ellipsis-vertical': true,
//       'c-setting-todo-button':true,
       'settings-Show' : this.state.settingsShow
    });
      
    const ClassNameSettingsList = ClassNames({
       'settings-Show' : this.state.settingsShow,
       'settings-Close' : !this.state.settingsShow,
       'c-settings-form' : true
    });
      
    return (
      <div id="setting-div" className="c-setting-todo-button" onClick={this.handleChangeShow}>
        <i id="setting-icon" className={ClassNameIcon} ></i>
        <div id="setting-form"　className={ClassNameSettingsList} ref={this.modalRef}>
            <div id="setting-title" className="c-setting-form__title">並べ替え</div>
            <ul className="c-setting-form__lists">
                <li className="c-sort" id="sortDate" onClick={this.handleSort}>日付</li>
                <li className="c-sort" id="sortCreated" onClick={this.handleSort}>作成した順序</li>
                <li className="c-sort" id="sortDefault" onClick={this.handleSort}>デフォルト</li>
            </ul>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired
};
//propsに渡す型を指定することで想定外の方で入ってくるのを防ぐことができる
//ここではTodoCreaterコンポーネントを使用するときはpropsで関数型のdispatchを渡すことが必須だという指定になる

export default connect()(Settings)
//これを書くことでactionsと繋がりactionsの関数を使える
