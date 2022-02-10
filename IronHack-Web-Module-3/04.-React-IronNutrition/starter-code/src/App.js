// Module dependencies
import React, { Component } from 'react';
import listOfFoods from './data/foods.json';

// Project dependencies
/// Components
import FoodBox from './components/FoodBox';
import FoodForm from './components/FoodForm';
import FoodList from './components/FoodList';
import Search from './components/Search';

// App
class App extends Component {

  state = {
    foods: listOfFoods,
    isForm: false,
    searchValue: '',
    foodList: []
  }

  handleClickAdd = () => {
    this.setState({
      isForm: !this.state.isForm
    })
  }

  handleAddNewFood = newFood => {
    const {foods}  = this.state;
    newFood.quantity = 0;
    foods.push(newFood);
    this.setState({
      foods: foods,
      isForm: !this.state.isForm
    })
  }

  handleSearch = searchValue => {
    this.setState({
      searchValue: searchValue,
    })
  }

  handleAddToList = food => {
    const {foodList} = this.state;
    const index = foodList.map(function(food) { return food.name; }).indexOf(food.name);
    if(index === -1) {
      foodList.push(food);
    }
    this.setState({
      foodList: foodList
    })
  }

  handleDeleteFood = index => {
    let {foodList} = this.state;
    foodList.splice(index,1)
    this.setState({
      foodList: foodList
    });
  }

  renderFoods = (foodArray, searchValue) => {
    const {handleAddToList} = this;
    const filteredArray = foodArray.filter( food => {
      return food.name.toLowerCase().includes(searchValue.toLowerCase())
    })
    return filteredArray.map((food, index) => <FoodBox key={index} food={food} handleAddToList={handleAddToList}/>)
  }

  render() { 
    const {handleClickAdd, handleAddNewFood, handleSearch, handleDeleteFood, renderFoods} = this;
    const {isForm, foods, searchValue, foodList} = this.state;
    return (
      <main>
        <h1 className="title is-2">IronNutrition</h1>
        <button className="btn is-info" onClick={handleClickAdd}>Add New Food</button>
        {isForm ? <FoodForm handleAddNewFood={handleAddNewFood}/> : null}
        <div className="columns">
          <div className="column">
            <Search handleSearch={handleSearch}/>
            {renderFoods(foods, searchValue)}
          </div>
          <div className="column">
            <FoodList foodList={foodList} handleDeleteFood={handleDeleteFood}/>
          </div>
        </div>
      </main>
    )
  }
}

// Export
export default App;