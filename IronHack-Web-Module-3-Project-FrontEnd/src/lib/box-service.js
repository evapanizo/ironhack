// Module dependencies
import axios from 'axios';

// Box Service
class Box {

  constructor() {
    this.box = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  createBox(box) {
    return this.box.post('/box/create', box)
      .then(({ data }) => data);
  }

  getBox() {
    return this.box.get('/box/get')
      .then(({ data }) => data);
  }

  getPopulatedBox() {
    return this.box.get('/box/populate')
      .then(({ data }) => data);
  }

  editBox(box) {
    return this.box.put('/box/edit', box)
      .then(({ data }) => data);
  }

}

// Instance of the service
const box = new Box();

// Export the instance
export default box;