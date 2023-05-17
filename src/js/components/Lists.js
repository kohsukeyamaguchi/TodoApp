import React from 'react';
import { connect } from 'react-redux';
import { createList, changeCurrentList } from '../actions'
import PropTypes from "prop-types";
import {store} from '../app';
import ClassNames from 'classnames';
import ListTitle from './ListTitle';

class Lists extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentList:'home',
            createListMode: false,
            listName: '',
            lists: []
        };
        
        this.handleClickListName = this.handleClickListName.bind(this);
        this.handleCloseCreateListForm = this.handleCloseCreateListForm.bind(this);
        this.handleChangeListName = this.handleChangeListName.bind(this);
        this.handleCreateList = this.handleCreateList.bind(this);

    }
    
    handleClickListName(listname){
        if(listname == '＋新しいリストの作成'){
            this.setState({
                createListMode: true
            });
        }else{
            this.setState({
                currentList: listname
            });
            //現在、表示するリストの名前を送るアクションを作成してここで使用する
            this.props.dispatch(changeCurrentList(listname));
        }
    }
    
    handleCloseCreateListForm(e){
        this.setState({
            createListMode: false
        });
    }
    
    handleChangeListName(e){
        if(this.state.createListMode){
            this.setState({
                listName: e.currentTarget.value
            });
        }
    }
    
    handleCreateList(){
        let listName = this.state.listName;
        let newLists = store.getState().task.lists;
        if(listName){
            //reducerにlistnameを送るアクションを定義して実行する。
            console.log(listName);
            this.props.dispatch(createList(listName));
            this.setState({
                currentList: listName,
                lists: newLists,
                createListMode: false,
                listName: ''
            });
        }
    }
    
    
    componentDidUpdate(){
      const currentListElement = document.getElementsByClassName('c-current-list');
      currentListElement[0].scrollIntoView({behavior: "smooth", inline: "center"});
    }
    
    render(){
        const lists = store.getState().task.lists;
        let listArray = [];
        
        const ClassNameCreateList = ClassNames({
           'c-create-list-form': true,
           'c-js-create-list-form--show' : this.state.createListMode,
           'c-js-create-list-form--close' : !this.state.createListMode
        });
        
        const ClassNameCreateListCover = ClassNames({
           'c-cover' : true,
           'c-js-create-list-form--show' : this.state.createListMode,
           'c-js-create-list-form--close' : !this.state.createListMode
        });
        
        for(let i in lists){
            listArray.push(<ListTitle key= {i} listName= {lists[i]} currentList={this.state.currentList} handleClickListName={this.handleClickListName} />);
        }
        
        return (
            <div className="c-lists">
                <ul className="c-lists__ul">
                    {listArray}
                </ul>
                <div className={ClassNameCreateList}>
                    <div className="c-form-contents">
                        <div　className="c-create-list-form__title">新しいリストを作成</div>
                        <input type="text" className="c-create-list-input" value={this.state.listName} placeholder="名前を入力してください" onChange={this.handleChangeListName} />
                        <div className="c-buttons">
                            <button type="button" className="c-cancel-button" onClick={this.handleCloseCreateListForm}>キャンセル</button>
                            <button type="button" className="c-create-button" onClick={this.handleCreateList}>完了</button>    
                        </div>
                    </div>
                </div>
                <div className={ClassNameCreateListCover}></div>
            </div>
        );
      
    }
}
    
Lists.propTypes = {
  dispatch: PropTypes.func.isRequired
};



export default connect()(Lists);