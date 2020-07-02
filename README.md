# Tic-Na-Cho

Tic-Na-Cho is a Nacho Libre Themed tic tac toe web application. Nacho Libre is my favorite movie of all time. It was fun adding the theme including images, sounds, and colors which give the user fun feeback on the state of the game.

Efforts were made to provide a great user experience for all users. The app takes into consideration accessibility and I believe provides a clear, enjoyable user experience.

The website passes AA accessibility thresholds in contrast and contains semantic html with proper labeling and text. Screen readers should allow a person with limited vision the ability to play this game using the keyboard. Mouse users will enjoy the responsive components and feedback on hover. The game can be played on desktop, tablet, or phone.

## The code

The app was built using html, scss, and javascript using the Ember.js framework version 3.18 (Ember Octane). Efforts were made to create well commented/documented code that was modularized and as clear as possible. The html is semantic, the scss is modularized, and the javascript is well documented, tested, and reusable.

## About the process

My goal from the very beginning was to create a clear, strong MVP and then build from there. The first steps were to whiteboard. Using classic for loops I worked out versions of the functions that would be needed for the logic of tic tac toe.

I had a good understanding of how this app would be implemented using vanilla javascript dom manipulation, and css but I wanted to use ember octane and scss to implement this app. Scss is fairly new to me and I had previously worked on only one app using an older version of Ember so this game was both a challenge and a learning experience.

Once I built the MVP with good comments and some tests, I had friends and family play with my app and provide me feedback. Much of the feedback was about making it funner, especially the ending, I did not yet have a theme. It was not long before I chose Nacho Libre. I then refactored my code to include the theme. Challenges here were in making sure all the handlebars logic worked with the possible outcomes: Nacho: "x" moves/wins, Ramses: "o" moves/wins, or a draw. Finally I completed comments and more tests.

## Player experience

Tic-Na-Cho is currently a 2 player game. Players will arrive at a welcome screen introducing them to the Nacho Libre theme. Players will then click to enter the game. Players will arrive at a form to submit their names. Once they submit they will be greeted with their assignments, Nacho: "x" or Ramses: "o." There is also a scoreboard keeping track of the wins by player name. The current player is clearly displayed.

Players can now add a marker on the grid with a click or tabbing and pressing enter. Players take turns until the game ends in a win or draw. Players experience a different image, sound, and quote depending on the three possible outcomes. Finally, players can select to play again keeping track of their wins or play with new names/players in which case the scoreboard resets. If the button new-players is selected, users return to the player name input form. Players only enter the welcome screen on a refresh.

## Future considerations

I am pleased with the UX, UI, but due to time constraints I did not extend the game logic as much as I would have liked. I really want to implement an AI to allow users to play one player games against the computer.

# To Run Code from zipped package

## prerequisites

- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://ember-cli.com/)
- modern web browser like chrome or firefox

## steps

- unzip the file
- cd into the root directory tic-tac-toe
- `cd tic-tac-toe`
- run npm install
- `npm install`

- once that is complete, start ember server
- `ember serve`
- Visit the app at [http://localhost:4200](http://localhost:4200).
- Visit tests tests at [http://localhost:4200/tests](http://localhost:4200/tests)

# From Embej.js: how to collaborate from git clone

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://ember-cli.com/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd tic-tac-toe`
- `npm install`

## Running / Development

- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `npm run lint:hbs`
- `npm run lint:js`
- `npm run lint:js -- --fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://ember-cli.com/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
