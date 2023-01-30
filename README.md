# Thinkful-Recipe-App

A front end React.js recipe tracking application with an internal storage. 

Allows a user to:
- create new recipes
- edit existing recipes
- delete a recipe

Utilizes a form submission to add recipes, with proper form validation. 

## To create front and back end communication:

- edit <Recipe.js>:
    - edit table data to match database variables: name, image_url, cuisine, link [X]
    - add button for edit submission, reuse form but populate form data with previous submission []

- edit <App.js>:
    - change initial form data state []
    - edit change, delete, and submit handlers to communicate with back end []
    - add use effect to get recipe data from the db []
    - add a react router and create a route for viewing the recipe list and creating a new one, or getting 7 random ones for the week and displaying them on the page []

- edit <RecipeCreate.js>:
    - edit form data to use the inital form states properties []

- delete <RecipeData.js>:
    - no longer needed once the back end gets connected via use effect for data list retrieval []