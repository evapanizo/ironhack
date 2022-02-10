# Ugly Veggie

## Description
Ugly Veggie is a web application that offers a fruit and vegetables delivery service to its users. A lot of fruits and vegetables are not bought by supermarkets because they are small, asymmetric, scarred or decolorated and so, they are ugly. Ugly Veggie offers the users the opportunity to buy a box of these products and get it delivered to their doorstep.

Ugly Veggie users can select the box they are interested in and fill it with any of the available products. Once their box is ready, they can pay for the service and subscribe to a weekly delivery. If they want, they can also change the selected box or the products in it, as well as their delivery information.  

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anon I can sign up in the platform so that I can start getting the ugly veggie service.
-  **Login:** As a user I can login to the platform so that I can edit my ugly veggie service preferences and information.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Select a box:** As a user I can select a box so that I can fill it with the quantity of products I want. 
-  **Fill the box:** As a user I can fill the box with the items I prefer so that I don't get delivered anything I don't want. 
-  **Search the products:** As a user I can search which are the available products so that I can choose which ones I prefer.
-  **Pay the service:** As a user I can pay the services so that I get my box delivered. 
-  **Edit the box selection:** As a user I can edit the box selection so that I can get more/less products. 
-  **Edit the box products:** As a user I can edit the box products so that I can start/stop recieving products I am/am not interested in/anymore. 
-  **Edit delivery information:** As a user I can edit the delivery information so that I can get the box delivered to any address I want. 
- **Unsubscribe:** As a user I can unsubscribe from the delivery service so that I can stop recieving and paying the service. 

## Backlog

- Styles.
- Email notifications.
- Password recovery.
- Facebook login.
- Password strength indicator. 
- Delivery address validation. 
- Pagination for products. 
- Paypal/Stripe payment. 
- Details page for the products. 
  
# Client

## Routes
| Route        | Description |
| :------------- |:-------------|
| /      | Homepage |
| /auth/signup      | Signup form |
| /auth/login | Login form |
| /account | Show profile |
| /account/complete| Show complete profile form |
| /account/welcome| Show welcome message |
| /account/edit| Edit profile form |
| /box  | Show box summary |
| /box/edit  | Show edit box content |
| /box/change | Show change box plan |
| 404  | Show Not Found |

## Pages

- Home Page 
- Sign in Page 
- Log in Page 
- Profile Page
- Edit profile Page.
- Box Page
- Edit Page
- Complete Profile Page. 
- 404 Page 

## Components
- Anonymous Route
- Private Route
- Loader
- NavBar
- Burger Menu
- Carousel
- Slide
- First Slide
- Second Slide
- Box Form
- Completed Account
- Incompleted Account
- Search Bar
- List of Products
- Product Cart
- Product

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.updateUser (user)
  - auth.updatePayment(payment)
- Box service
  - box.createBox(box)
  - box.getBox()
  - box.getPopulatedBox()
  - box.editBox(box)
- Product service
  - product.getProducts()
  - product.searchByName(searchValue);

# Server

## Models

User model

```
email                   String // required & unique
password                String // required
firstName               String 
lastName                String 
deliveryAddress         Object 
    - streetAddress     String 
    - country           String 
    - province          String 
    - city:             String 
    - postalCode:       Number 
phone                   String 
notifications           Boolean
payment                 Boolean
completeProfile         Boolean
```

Box model

```
price                   Number  // required
size                    String  // required
maxQuantity             Number  // required
products                Array of Objects  // required
    - quantity          Number
    - listOfProducts    ObjectID<Product>
owner                   ObjectID<User>
```

Product model

```
name             String  // required
image            String  // required
stock            Number  // required
description      String  // required
```

## API Endpoints/Backend Routes


| Method        | Route       | URL/Body |
| :------------- |:-------------|:-------------|
| GET      | /auth/me ||
| POST     | /auth/signup | email, password|
| POST     | /auth/login | email, password|
| POST     | /auth/logout | |
| PUT     | /auth/update | firstName, lastName, deliveryAddress, phone, completedProfile 
| PUT     | /auth/payment | payment |
| GET     | /box/get |  |
| GET     | /box/populate |  |
| POST     | /box/create | price, size, maxQuantity, products |
| PUT     | /box/edit | price, size, maxQuantity, products |
| GET     | /products |  |
| GET     | /products/search | name |

## Links

### Trello/Kanban

[Trello](https://trello.com/b/GmqIGrQa/ugly-veggie)

### Git

The url to your repository and to your deployed project

[Client](https://github.com/evapanizo/m3-frontend)
[Server](https://github.com/evapanizo/m3-backend)

[Deploy](https://ugly-veggies.firebaseapp.com)

### Slides

[Slides Link](https://slides.com/evapanizo/ugly-veggie)