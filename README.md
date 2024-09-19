# The Giggle Garden
Giggle Garden is an application where you can see many different, funny jokes. You can filter the jokes based on the cathegories "Spooky", "Christmas" and "Programming". You can also add jokes to a personal list of favorites.  
*We hope you have a giggle.*

## Running the project
The application is visible on http://it2810-12.idi.ntnu.no/project1/ (when using NTNU-network or VPN).

If you want to install the project from your computer, clone as normal and then write the following in the terminal:
 
`cd prosjekt1`   
`npm install`  
`npm run dev`

If the webpage doesn't open automatically, copy the link from the terminal (starting with http://localhost:..) and paste in browser. 

## Technology  
Technologies used are mainly TypeScript, React, CSS and HTML. 
Prettier and ESlint is used to maintain code quality. 

## REST API
The application is based on a REST API called JokeAPI, here is the documentation: https://jokeapi.dev/.

We used [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) to manage the API data fetching efficiently. Using TanStack Query’s `useQuery` hook, we were able to cache jokes and handle loading states.

We had to make some decisions when implementing the REST API, based on two key challenges we encountered:
1.	The API allows fetching a maximum of ten jokes per request. This required us to make multiple requests when fetching more than ten jokes at a time.

2.	The joke IDs within the first 318 jokes are scattered and not sequential. For example, there are only ten Christmas jokes and ten Spooky jokes, with IDs distributed randomly throughout the range. This randomness meant we couldn't simply take a range of consecutive numbers to fetch ten jokes from the same category. This also meant incrementing them directly when changing slides would not work.

To address these challenges…

- we decided 30 was a good number, so we developed the `fetchAllJokes()`, which uses `fetchJokesByCategory (category, batchSize, rangeStart, rangeEnd)` to gather exactly ten jokes from each category. 

- we also created a predefined list of valid joke IDs (that eventually got split into two lists: `slideshowIDs` and `inUseIDs`), so that we could use it to change slides. Since the IDs are non-sequential, incrementing them directly when changing slides would not work.



## Testing
To run the tests, write `npm test` in terminal. You will now see all the tests passed (or failed) along with a coverage report.

The testing is focused on the components, to make sure the building blocks work as intended. As per now, the coverage is high on the components JokeCard, FavoritePage and SlideShow. 