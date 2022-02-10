// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import TrashButton from './TrashButton'

// FoodList
class FoodList extends Component {

  render() { 
    const {foodList, handleDeleteFood} = this.props;
    return (
      <div className="food-list">
        <h2 className="title is-3">Today's food</h2>
        <ul>
          {foodList.map((food, index) => 
            <li key={index}>
              {food.quantity} {food.name} = {food.quantity * food.calories} cal
              <TrashButton index={index} food={food} handleDeleteFood={handleDeleteFood}/>
            </li>
          )}
        </ul>
        <p>
          <strong>Total: {foodList.reduce( (a,b) => a + (b.quantity * b.calories), 0)} cal</strong>
        </p>
      </div>
    )
  }
}

// Export
export default FoodList;
