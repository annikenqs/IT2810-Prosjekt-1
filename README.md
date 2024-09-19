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
The application is based on a REST API from https://jokeapi.dev/.   
Technologies used are mainly TypeScript, React, CSS and HTML. 
Prettier and ESlint is used to maintain code quality. 

## Testing
To run the tests, write `npm test` in terminal. You will now see all the tests passed (or failed) along with a coverage report.

We've chosen to prioritize testing on the key components, to make sure the building blocks work as intended, specifically JokeCard, FavoritePage and SlideShow. As per now, the coverage is high on these components. If given more time we would expand our testing to cover functions used in App.tsx, such as the filtering functionality.

## Design choices
Since our application contains a limited number of jokes, we found it simpler to keep everything on a single page to limit unnecessary navigation. This includes the slideshow, the scrollmenu and the favorites list. 

Due to the limit of number of jokes, the favorited jokes are easy find in the main joke list, so we've decided to only allow unfavoriting directly from the JokeCard itself, and not the FavoritePage