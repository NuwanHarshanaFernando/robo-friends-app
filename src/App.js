import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';

class App extends Component{
    constructor() {
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    /*
    onSearchChange(event){
        console.log(event.target.value);
    }
    */

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

        /*
        const filterRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
    console.log(filterRobots);
    */

    }

    render(){

        
        const filterRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
      

        return(
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <CardList robots={filterRobots}/> 
            </div>
        );
    }
    
}

export default App;