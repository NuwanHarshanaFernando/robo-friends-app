import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error:state.requestRobots.error
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component{
    /*
    constructor() {
        super()
        this.state = {
            robots: []
        }
    }
    */

    componentDidMount(){
       // console.log(this.props.store.getState())

       /* fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}));
        */

        this.props.onRequestRobots();

    }
  

   

    render(){

       //const {robots, searchfield} = this.state;
       // const {robots} = this.state;
        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filterRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
      
        return isPending ?
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


//Install a Redux Middleware called 'redux-thunk' to handle asynchronous actions
//npm install redux-thunk