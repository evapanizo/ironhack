const handleError = (error) => {
  let isErrorEmailPassword = false;
  let isAlreadyUser = false;
  let isEmpty = false;
  switch (error.response.data.error) {
    case 'user-not-found':
      isErrorEmailPassword = true;
      break;
    case 'wrong-password':
      isErrorEmailPassword = true;
      break;
    case 'email-not-unique':
      isAlreadyUser = true;
      break;
    default :
      isEmpty = true;
      break;
  }
  return {isErrorEmailPassword, isAlreadyUser, isEmpty};
}

const handleBoxCreation = (size) => {
  switch (size) {
    case 'small':
      return { 
        size: 'small',
        price: 5,
        maxQuantity: 2,
        products: []
      }
    default:
    case 'medium':
      return { 
        size: 'medium',
        price: 10,
        maxQuantity: 5,
        products: []
      }
    case 'large':
      return { 
        size: 'large',
        price: 15,
        maxQuantity: 10,
        products: []
      }
  }
}

const getTotalQuantityOfProducts = (box) => {
  return box.products.reduce( (acc, cval) => {
    const sum = acc+cval.quantity;
    return Math.round(sum*100)/100;
  }, 0)
}

const validateUserInfo = (values) => {
  if(values.firstName === '' || values.lastName === '' || values.phone === '' || 
  values.deliveryAddress.streetAddress === '' || values.deliveryAddress.country === '' || 
  values.deliveryAddress.province === '' || values.deliveryAddress.city === '' || 
  values.deliveryAddress.postalCode === '') {
    return 'Fields are empty'
  } else {
    return null
  }

}


// Export
export default {
  handleError,
  handleBoxCreation,
  getTotalQuantityOfProducts,
  validateUserInfo
}