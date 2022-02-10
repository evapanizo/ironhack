
## Description

PokeTrade is a web application exclusively designed for Pokemon fans.   
Pokemon trainers from all over the world can have their own trainer profile as well as edit it! They can also make a trade list for other trainers to see. This trade list includes the Pokemon you offer and the ones you are interested in. 
PokeTrade also includes a search engine, where you check which trainers have the Pokemon you want in your team, so that you can contact them for trades and catch them all!
 
 
## User Stories
### Homepage
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.
### Authentication
- **sign up** - As a user I want to sign up on the webpage so that I can access the app. 
- **login** - As a user I want to log in on the webpage so that I can get back to my account.
- **logout** - As a user I want to log out from the webpage so that I can make sure no one will access my account.
### Profile
- **profile** - As a user I want to show and edit my profile so that other users can learn about me and have my contact info.  
### Trades
- **trade list** - As a user I want to show and edit my trade list so that other users can learn my trade preferences.  
### Search engine
- **searh engine** - As a user I want to search a Pokemon I'm interested in so that I can find out which users might want to trade it. 
### Error control
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

## Backlog
- Styles & animations. 
- Add upload profile picture option. 
- Add reset password option.
- Extra notifications.
- Add events. 
- Add Pokemon details. 
- Communication between trainers. 

## Routes

### MVP
| Method | Route | Description |
|--------|-------|-------------|
| `get` | `/` | Renders the homepage. |
| `get` | `/auth/signup` | Renders the signup form. If user has logged in, redirects to /profile.  |
| `post` | `/auth/signup` | Redirects to /profile if user has signed up correctly. Else, redirects to /signup.   |
| `get` | `/auth/login` | Renders the login form. If user has logged in, redirects to /profile. |
| `post` | `/auth/login` | If user has logged in correctly, redirects to /profile. Else, redirects to /login.  |
| `post` | `/auth/logout` | Redirects to /. |
| `get` | `/profile` | Renders the profile page (protected). |
| `post` | `/profile` | Updates profile and redirects to profile page (protected). |
| `get` | `/profile/edit` | Renders the edit profile page (protected). |
| `get` | `/profile/:id` | Renders the profile page if user with the id in the URL (protected). |
| `get` | `/trades` | Renders the trade list page (protected). |
| `get` | `/trades/add/myPokemon` | Renders the add Pokemon form to *My Pokemon* list(protected). |
| `get` | `/trades/add/wishList` | Renders the add Pokemon form to *Wish List* (protected). |
| `get` | `/pokesearch?q=` | Renders the search engine page and renders search results if a query is requested (protected).|
| `post` | `/trades/add/myPokemon` | Adds Pokemon to *My Pokemon* list and redirects to /trades (protected). |
| `post` | `/trades/add/wishList` | Adds Pokemon to *Wish List* and redirects to /trades (protected). |
| `post` | `/trades/:index/myPokemon/delete'` | Deletes a Pokemon from *My Pokemon* list and redirects to /trades (protected). |
| `post` | `/trades/:index/wishList/delete'` | Deletes a Pokemon from *Wish List* and redirects to /trades (protected). |
| `get` | `/api/trades/pokemon` | Finds if a given Pokemon is in the database and returns the json with the corresponding data (protected).|
| `get` | `/search-pokemon` | Finds which Pokemon include a given string in their names and returns the json with the corresponding data (protected).|

### Backlog
| Method | Route | Description |
|--------|-------|-------------|
| `get` | `/pokemon/:pokemon` | Renders the Pokemon details page (protected).|

## Models

### Trainer

#### MVP
```
username: String
password: String
my_pokemon: Array of Pokemon IDs
wish_list: Array of Pokemon IDs
```
#### Backlog
```
Avatar: String // URL
Telegram: String
Gender: String
Age: Number
Description: String
Location: String
```
### Pokemon
#### MVP
```
name: String
image: String //URL
``` 
#### Backlog
```
trade-platform: String // Enum: Switch, PoGo, GBA, ...
game: String // Enum: Gold, Silver, Yellow, ...
``` 

## Links

### Trello

[Trello link](https://trello.com/b/2F0nTrm1/poketrade)

### Git


[Repository Link](https://github.com/evapanizo/poketrade)

[Deploy Link](https://poketradeih.herokuapp.com/)

### Slides


[Slides Link](https://slides.com/evapanizo/poke-trade)
