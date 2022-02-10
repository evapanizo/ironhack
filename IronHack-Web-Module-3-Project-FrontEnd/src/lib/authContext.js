// Module dependencies
import React, { Component } from 'react'

// Project dependencies
/// Components
import authService from './auth-service';
import Loader from '../components/Loader'

// Create context objects
const { Provider, Consumer } = React.createContext();

// withAuth - Returns a component with superpowers (with given props)
export const withAuth = (Comp) => { 
  return (props) => {
    return <Consumer>
      {value => {
        return <Comp {...value} {...props} />
      }}
    </Consumer>
  }
}

// Authentication Context
export default class AuthContext extends Component {

  state = {
    isLogged: false,
    user: null,
    isLoading: true
  }

  componentDidMount() {
    authService.me()
    .then( (user) => {
      this.setState({
        user,
        isLoading: false,
        isLogged: true
      })
    })
    .catch( () => {
      this.setState({
        isLogged: false,
        user: null,
        isLoading: false
      })
    })
  }

  handleSetUser = (user) => {
    this.setState({
      user,
      isLogged : true
    })
  }

  handleLogOut = () =>{
    authService.logout()
    .then( () => {
      this.setState({
        user : null,
        isLogged : false
      })
    })
    .catch( (error) => {
      console.warn(error)
    })
  }
 
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loader/> : <Provider value={{
      isLogged: this.state.isLogged,
      user: this.state.user,
      logout: this.handleLogOut,
      setUser: this.handleSetUser
    }}>
      {this.props.children}
    </Provider>
  }
}
