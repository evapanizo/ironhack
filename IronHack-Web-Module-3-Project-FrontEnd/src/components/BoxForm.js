// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Project dependencies
/// Components
import Loader from '../components/Loader';
/// Helpers
import helpers from '../helpers/helpers';
// Context
import {withAuth} from '../lib/authContext';
// Services
import boxService from '../lib/box-service';
import authService from '../lib/auth-service';

// Box Form
class BoxForm extends Component {

  state = {
    inputValue: '',
    emptyField: false,
    samePlan: false,
    isLoading: true,
    box: null
  }

  // Functions to handle image selection
  handleSmall = () => {
    const {size} = this.state.box
    if(size === 'small'){
      this.setState({
        inputValue: 'small',
        samePlan: true,
        emptyField: false,
      })
    } else {
      this.setState({
        inputValue: 'small',
        samePlan: false,
        emptyField: false
      })
    }
  }

  handleMedium = () => {
    const {size} = this.state.box
    if(size === 'medium'){
      this.setState({
        inputValue: 'medium',
        samePlan: true,
        emptyField: false,
      })
    } else {
      this.setState({
        inputValue: 'medium',
        samePlan: false,
        emptyField: false
      })
    }
  }

  handleLarge = () => {
    const {size} = this.state.box
    if(size === 'large'){
      this.setState({
        inputValue: 'large',
        samePlan: true,
        emptyField: false,
      })
    } else {
      this.setState({
        inputValue: 'large',
        samePlan: false,
        emptyField: false
      })
    }
  }
  
  // Handle submit - If empty, print error message. Else, updates box (empty).
  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    if(inputValue === '') {
      this.setState({
        emptyField: true
      })
    } else {
      const box = helpers.handleBoxCreation(inputValue);
      box["products"] = [];
      boxService.editBox(box)
        .then( () => {
          authService.updatePayment({payment: 'false'})
          .then( (user) => {
            const {setUser} = this.props;
            setUser(user);
            this.props.history.push('/account')
          })
          .catch( (error) => console.warn(error))
        })
      .catch((error) => {
          this.setState({
            inputValue: ''
          }) 
          console.warn(error)
        });
    }
  }
  
  componentDidMount () {
    boxService.getBox()
    .then( (box) => {
      this.setState({
        box,
        isLoading: false,
      })
    })
    .catch((error) => {
      console.warn(error)
      this.setState({
        isLoading: false,
      })
    })
  }

  render() {
    const {emptyField, isLoading, samePlan} = this.state;
    return isLoading ? <Loader/> : <div className="change-box-container">
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
        { samePlan ? <div className="selection">
            <form onSubmit={this.handleSubmit}>
                <input className="btn btn-primary change-btn" type="submit" value="CONFIRM"/>
              </form>   
              <p className="small-text warning">If you select the same plan, your box will be emptied and your payment cancelled.</p> 
          </div> : <div className="selection">
            <form onSubmit={this.handleSubmit}>
              <input className="btn btn-primary change-btn" type="submit" value="change plan"/>
            </form>   
            <p className="small-text">Notice that if you change your plan, your weekly payment will 
            be canceled until you fill your box again.</p>
          </div>    
        }
      </div>
  }
}

// Export
export default withRouter(withAuth(BoxForm));