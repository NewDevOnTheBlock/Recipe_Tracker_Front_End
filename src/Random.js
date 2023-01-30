import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { listRecipes } from "./utils/api";

function Random({ handleDelete }) {
  const random5 = [];
  const recipeIdSet = new Set();

  const [recipes, setRecipes] = useState([]);

  function loadRecipes(signal) {
    listRecipes(signal).then(setRecipes).catch(console.error);
  }

  // create a handle delete function that takes in an id and slices the item out of the array
  useEffect(() => {
    const abortController = new AbortController();

    loadRecipes(abortController.signal);

    return () => abortController.abort();
  }, []);

  // takes in a max and
  const randomRange = (myMin, myMax) => {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
  };

  // while there are less than 5 items in my random5 array
  // generate a random index, between 0 and the recipes.length - 1
  // use that index to grab an item
  if (recipes.length > 0) {
    while (random5.length !== 5) {
      // while the array we want to populate has less than 5, loop and:
      const index = randomRange(0, recipes.length - 1); // generate a random number between 0 and recipes.length - 1
      const randomRecipe = recipes[index]; // grabs a recipe from the recipes array at the random index
      if (!recipeIdSet.has(randomRecipe.recipe_id)) {
        random5.push(randomRecipe); // push the random recipe into the array
        recipeIdSet.add(randomRecipe.recipe_id); // add the id of the recipe to the set
      }
    }
  }

  if (random5.length < 5) {
    return <h3>Loading... please wait...</h3>;
  } else {
    // take the random5 array and run each property through a recipe component
    const randomRecipes = random5.map(({ name, cuisine, recipe_id, link }) => {
      return (
        <Recipe
          name={name}
          cuisine={cuisine}
          recipe_id={recipe_id}
          link={link}
          handleDelete={handleDelete}
        />
      );
    });

    return (
      <div className="recipe-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{randomRecipes}</tbody>
        </table>
      </div>
    );
  }
}

export default Random;
