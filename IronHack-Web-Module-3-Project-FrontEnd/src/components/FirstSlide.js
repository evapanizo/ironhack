// Module dependencies
import React, { Component } from 'react'

// FirstSlide
class FirstSlide extends Component {

  state = {
    inputValue: '',
    emptyField: false
  }
  
  handleSmall = () => {
    this.setState({
      inputValue: 'small'
    })
  }

  handleMedium = () => {
    this.setState({
      inputValue: 'medium'
    })
  }

  handleLarge = () => {
    this.setState({
      inputValue: 'large'
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    const { inputValue } = this.state;
    if(inputValue === '') {
        this.setState({
          emptyField: true
        })
    } else {
      handleSubmit(inputValue);
      this.setState({
        inputValue: ''
      })
    }
  }

  render() {
    const {emptyField} = this.state;
    return (
      <div className="first-slide">
        <h2>Choose your box</h2>
        <input type="image" 
               src={process.env.PUBLIC_URL + '/images/smallBox.png'}
               onClick={this.handleSmall}
               className='box-img'
               alt='Small box logo'
        />
        <input type="image" 
               src={process.env.PUBLIC_URL + '/images/mediumBox.png'}
               onClick={this.handleMedium}
               className='box-img'
               alt='Medium box logo'
        />
        <input type="image" 
               src={process.env.PUBLIC_URL + '/images/largeBox.png'}
               onClick={this.handleLarge}
               className='box-img'
               alt='Large box logo'
        />
        {emptyField ? <p className="error-sms">Please, select a box.</p> : <p className="error-sms"></p>}
        <form onSubmit={this.handleSubmit}>
          <input className="btn slide-arrow-right" type="submit" value=">"/>
        </form>

      </div>
    )   
  }
}

// Export
export default FirstSlide;
