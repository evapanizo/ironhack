// Module dependencies
import React, { Component } from 'react';

// FoodForm
class FoodForm extends Component {

  state = {
    name: '',
    calories: '',
    images: '',
  }

  handleEdit = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const {handleAddNewFood} = this.props;
    handleAddNewFood(this.state);
  }
  
  render() { 
    const {handleSubmit, handleEdit} = this;
    return (
      <form className="add-form" onSubmit={handleSubmit} onChange={handleEdit}>
        <label htmlFor="name" className="label">Name</label>
        <input type="text" className="input" name="name" required/>
        <label htmlFor="calories" className="label">Calories</label>
        <input type="number" className="input" name="calories" min="0" required/>
        <label htmlFor="image" className="label">Image URL</label>
        <input type="text" className="input" name="images" required/>
        <input type="submit" className="button is-info" id="add-submit" value="Add"/>
      </form>
    )
  }
}

// Export
export default FoodForm;
