# Explaining the Architecture of the Application

The goal for this project was to keep the application simple but easy to read. 
Therefore the use out of external libraries were contrained to only the most necessary UI libraries. 

## Higher Order Components 

Having decided early on, that i would place favorites and autocomplete in the same screen. i knew that there would be more complexity around having the list of favorites filled with the most recent changes.

`SearchGithub.tsx` manages the major states across both the autocomplete, and the github API data that gets fetched. As well as the local data that we fetch through GET from `reposerver` API that we use to show the which favorites we currently have.

```jsx

const [searchedInput, handleChange] = useState('');
const [dataset, changeData] = useState<{value: string, label : JSX.Element}[]>([]);
const [dataRef, setDataRef] = useState<{[key : string] : Repository}>({})
const [favData, setFav] = useState<responseLocalData>({})
const perPage = 10;

```
-  dataset here is parsed data is formatted to work with the dropdown with the autocomplete
-  dataRed here is a {[key : string] : repository} object that uses the name as key. The reason this exists is because the dropdown on the autocomplete can only return a string value. in this case it will return the name

