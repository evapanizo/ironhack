// Module dependencies
import axios from 'axios';

// Products Service
class Products {

  constructor() {
    this.products = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  getProducts() {
    return this.products.get('/products')
      .then(({ data }) => data);
  }

  searchByName(searchValue) {
    return this.products.get(`/products/search?name=${searchValue}`)
      .then(({ data }) => data);
  }

  getById(idArray) {
    return this.products.post(`/products`, idArray)
      .then(({ data }) => data);
  }

}

// Instance of the service
const products = new Products();

// Export the instance
export default products;