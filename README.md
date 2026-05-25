# sdv503-a2-study-tracker-13547666
Repository for my SDV503 Assessment Two. Designing a console line study tracker

This tracker app allows the user to enter information on timed session to store into a table for 
conventient tracking. The app rejects invalid input with meaningful error messages. The app displays a table of ALL
entered sessions along with a total at the bottom. 

# How to use:
IMPORTANT: PLEASE READ: 
- PLEASE read the recieving input section for how to enter a valid duration
- PLEASE read the KEY WORDS section for two important key words


## Recieving Input
- To start type 'npm run tracker' or 'node src/tracker-cli.js' in the console which will run the app
- You will then be prompted for a topic name, type something then press enter
- You will then be prompted for a session duration, type a number followed by a measurement then press enter
- EG. topic = "afternoon study", duration = 4h:20m
- After entering a valid topic and duration you are able to enter another session

## Validation:
- The tracker will NOT accept an empty topic OR one with just whitespace ' '
- The tracker will ONLT accept a number followed by a measurement symbol like '60m' or '1h'
- The number in each must be positive
- VALID MEASUREMENT SYMBOLS ARE 'h' and 'm' - Case does not matter - 'H' and 'M' will work fine
- The tracker accepts segments seperated by ':' EG. '4h:20m' will work and be translated to minutes for calculations
- As long as each segment is valid you can change as many as you like in any order like '50m:2h:5m:20m:3h'

## Display:
- After entering new session details a table of all entered sessions will display
- This table is formatted to be visually pleasing and easy to read with colouring and columns seperating topic and duration
- A total duration of all times added is displayed underneath
  
## KEY WORDS:
these are key words you can type into each box
NONE OF THESE ARE CASE SENSITIVE
- 'exit', typed into the enter topic input. Closes out of the app allowing you to refresh you sessions and access the terminal again
- 'cancel' typed into the enter duration input. Returns user to the enter topic input in case user may have miss-input or accidently started creating a new session they didnt want to create

# What makes the tracker work?
## READLINE:
- This tracker uses readline to recieve user input via the console
- This allows for easy chaining for multiple inputs
- Reads input for topic & duration

## Async Functions:
- Uses async functions to allow readline to be called without nesting multiple readlines within each other
- This allows output to be given between inputs then for more input to be gathered
This is what allows the tracker to be repeatible
gather input --> display sessions --> gather more input

## Module scripts (logger.js)
- Inside this project i have created a logger file containing functions which edit the looks of the console messages
- This allows for better formatting overall maintaining better readibility
- Functions inside the logger.js file are exported then imported into the tracker.cli.js file to be called
- The logger file imports a npm package called 'chalk' which is what actually makes the messages look good
- This also meant changing the 'type' from 'commonJS' to 'module' inside the package.json file

## String-Width
- This is just a imported npm package that allows me to get the visable length of text in the console for calculations to do with creating columns
- This is needed because the strings displayed in the console by the Chalk package include invisible characters that mess with calculations