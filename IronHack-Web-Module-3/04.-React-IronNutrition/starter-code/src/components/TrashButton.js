// Module dependencies
import React, { Component } from 'react';

// TrashButton
class TrashButton extends Component {

  handleDelete = () => {
    const {index, handleDeleteFood, food} = this.props;
    food.quantity = 0;
    handleDeleteFood(index);
  }

  render() { 
    const {handleDelete} = this;
    const {food} = this.props;
    return (
      <img className='trash-img' 
           src={`${process.env.PUBLIC_URL}/images/trash.png`} 
           alt={`${food.name} trash`}
           onClick={handleDelete}/>
    )
  }
}

// Export
export default TrashButton;