import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions'

const mapStateToProps = state => {
    return {
        //searchField: state.searchRobots.searchField
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)) 
    }
}

class App extends Component{
    constructor() {
        super()
        this.state = {
            robots: []
        }
    }

    componentDidMount(){
       // console.log(this.props.store.getState())
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}));
    }
  

    /*
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }
    */

    render(){

       //const {robots, searchfield} = this.state;
        const {robots} = this.state;
        const {searchField, onSearchChange} = this.props;
        const filterRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
      
        return !robots.length ?
            <h1>Loading</h1> :
        
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange = {onSearchChange}/> 
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filterRobots}/> 
                        </ErrorBoundry>    
                    </Scroll>    
                </div>
            );
        
       
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



//Install Redux-Middleware called redux-logger
//npm install redux-logger