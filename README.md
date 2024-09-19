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

The testing is focused on the components, to make sure the building blocks work as intended. As per now, the coverage is high on the components JokeCard, FavoritePage and SlideShow. 