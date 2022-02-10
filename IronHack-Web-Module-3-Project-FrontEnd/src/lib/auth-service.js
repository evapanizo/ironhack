// Module dependencies
import axios from 'axios';

// Auth Service
class Auth {

  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  signup(user) {
    const { email, password } = user;
    return this.auth.post('/auth/signup', {email, password})
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password } = user;
    return this.auth.post('/auth/login', {email, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data)
  }

  updateUser (user) {
    const { firstName, lastName, deliveryAddress, phone, completedProfile } = user;
    return this.auth.put('/auth/update', { firstName, lastName, deliveryAddress, phone, completedProfile })
    .then(response => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }

  updatePayment(payment) {
    return this.auth.put('/auth/payment', payment)
    .then(response => response.data)
  }

}

// Instance of the service
const auth = new Auth();

// Export the instance
export default auth;