// Module dependencies
import React, { Component } from 'react';

// FoodBox
class FoodBox extends Component {
  
  state = {
    value: 1
  }

  handleInputChange = event => {
    const value = event.target.value
    this.setState ({
      value: value > 1 ? value : 1 
    })
  }

  handleAddFoodList = () => {
    const {value} = this.state;
    const {food, handleAddToList} = this.props;
    food.quantity += parseInt(value);
    handleAddToList(food)
    this.setState ({
      value: 1
    })
  }

  render() { 
    const {name, image, calories} = this.props.food;
    const {value} = this.state;
    const {handleInputChange, handleAddFoodList} = this;
    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={image} alt={name}/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{name}</strong> <br />
                <small>{calories} cal</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number" 
                  value={value}
                  onChange={handleInputChange}
                />
              </div>
              <div className="control">
                <button className="button is-info" onClick={handleAddFoodList}>
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

// Export
export default FoodBox;
