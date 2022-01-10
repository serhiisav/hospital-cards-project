# Hospital task manager

## _Convinient visit task manager for hospitals_

The Hospital task management website is a simple, quick, and responsive website built with the
best principles of JavaScript Bootstrap technologies and Responsive Web Design.

## What is included

- A login mechanism that connects to the server and verifies the user's identity.
- Creating hospital visits by selecting a doctor and filling out the form's needed areas for that doctor.
- Render of any visits from the server that have been made and turning them into cards to display on the board.
- Unique filter which handles the card data and filters as selected by the user
- Cards offering the ability to modify, show more info or cancel a visit
- Fully responsive

## Tech

The Hospital task manager makes use of a variety of cutting-edge technology to make its job convenient:

- JavaScript
- Bootstrap
- HTML/CSS

## Project in detail:

- Requests class: [@levanton](https://github.com/levanton)

  - Functionality
    - Request module for (posting,getting,updating and deleting) data

- Modal class: [@levanton](https://github.com/levanton) [@mr-nazarii](https://github.com/mr-nazarii)

  - Functionality
    - Renders the Modal window
    - Renders the footer if selected

- LoginForm class: [@levanton](https://github.com/levanton)

  - Functionality
    - Renders the Login form
    - Verifies the validity of the inputted data

- VisitForm class: [@mr-nazarii](https://github.com/mr-nazarii) [@azapotochnyy](https://github.com/azapotochnyy)

  - Functionality
    - Renders the Visit form inside the Form
    - Opens the Form for modifications when called in the card

- Visit class: [@mr-nazarii](https://github.com/mr-nazarii) [@azapotochnyy](https://github.com/azapotochnyy)

  - Functionality
    - Renders the Visit form which has a select field with three options of doctors
    - Passes a set of standard required fields for filling after the doctor has been selected;
    - On selected option renders the chosen doctor form with passed standar questions for render

- VisitDentist VisitTherapist VisitCardiologist class: [@mr-nazarii](https://github.com/mr-nazarii) [@azapotochnyy](https://github.com/azapotochnyy)

  - Functionality
    - Renders the the fields of the selected doctor in the form

- Card class: [@azapotochnyy](https://github.com/azapotochnyy)

  - Functionality
    - Gets All the cards: sends GET reqest, maps data from response, saves json in a storrage, renders the visit cards on the board, if visit data is empty - shows: 'No items have been added';
    - Deletes the cards - sends a DELETE reqest, deletes: data from DOM, data from storrage. If the storrage is empty shows - 'No items have been added';
    - Modify the cards - modifies the Visit class to receive data from the cards when pressed modify, after prompts and fills in the Form with aquired data, then awaits for further modifications and does a Put request after the response - updates the DOM, storrage;
    - Show additional information - map data, shows information when the event is executed;

- Filter class: [@serhiisav](https://github.com/serhiisav)
  - Functionality
    - Creates a Filter Form and renders on the page:
      - Searches by title(purpose) / description(shortDesc)
      - Filters by status open/done (date of visit)
      - Filters by urgency (High/Medium/Low)
    - Gets all cards from local storage and compare with data from 'input' and(or) 'select' fields and show those that have matches. Gets visit status Appointment Date;
    - If no matches are found - renderes a message ('No results found');
    - Adds a button 'reset' - resets Filter Form and shows all cards.
