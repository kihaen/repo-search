# Explaining the Architecture of the Application

The goal for this project was to keep the application simple but easy to read. 
Therefore the use out of external libraries were contrained to only the most necessary UI libraries. 

## Higher Order Components 

Having decided early on, that i would place favorites and autocomplete in the same screen. i knew that there would be more complexity around having the list of favorites filled with the most recent changes.

`SearchGithub.tsx` manages the major states across both the autocomplete, and the github API data that gets fetched. As well as the local data that we fetch through GET from `reposerver` API that we use to show the which favorites we currently have.

This is also where all of the GET requests are being made.
- `GET /repo/` list all repositories
- `GET api.github.com/search/repositories?q=${search}&per_page=${perPage}` to list all github repos


Therefore all invalidate requests from the child components make call backs to this parent.

The States used to control the data flow

```jsx

const [searchedInput, handleChange] = useState('');
const [dataset, changeData] = useState<{value: string, label : JSX.Element}[]>([]);
const [dataRef, setDataRef] = useState<{[key : string] : Repository}>({})
const [favData, setFav] = useState<responseLocalData>({})
const perPage = 10;

```
-  dataset here is parsed data is formatted to work with the dropdown with the autocomplete acquired from github API
-  dataRef here is a {[id : string] : repository} object that uses the name as key. The reason this exists is because the dropdown on the autocomplete can only return a string value. in this case it will return the id. Repository here is in reference to githubs API repositories
- favData is the data populated from the GET request made to the `reposerver` this data will be passed on the the favorite child component.

## Why Are Favorites Functionality in the Parent Component?

The primary reason is because both The search bar component and Favorites Component need to interact with when to trigger a callback and fetch fresh data.

This data is then passed on to the favorites compoenet.

## The Favorites Component.

This component has the following responsibilites :
- Handling the Sorting of the favorited data, even when fresh data is provided
- Providing a Menu of options for sorting, keeping it scalable to other possible categories.
- Allowing the sorting to happen when the selection of order and category is made, no matter which order.
- Handling the `DELETE /repo/[repoID]` end point.

## Seperation of Logic

Parsing functions that for example creates JSX options for the autocomplete is imported from the misc.tsx file within the /common folder

Types are universally imported from the same /common folder

## Tests 

All tests are located within the root __tests__ folder, 
The tests are written in Jest and React Testing Library.






