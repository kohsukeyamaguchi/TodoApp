import React from 'react';
import { connect } from 'react-redux';
import { createList, changeCurrentList } from '../actions'
import PropTypes from "prop-types";
import {store} from '../app';
import ClassNames from 'classnames';

class ListTitle extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            listName: this.props.listName,
        };
        this.handleClickListName = this.handleClickListName.bind(this);
    }
    
    handleClickListName(e){
        this.props.handleClickListName(e.target.innerHTML);
    }
    
    render(){
        
        const ClassNameLi = ClassNames({
           'c-lists__li' : true,
           'c-current-list' : this.props.listName === this.props.currentList
        });

        return (
            <li className={ClassNameLi} onClick={this.handleClickListName}>{this.props.listName}</li>           
        );
      
    }
}
    
ListTitle.propTypes = {
    listName: PropTypes.string.isRequired,
    handleClickListName: PropTypes.func.isRequired,
    currentList: PropTypes.string.isRequired
};



export default connect()(ListTitle);