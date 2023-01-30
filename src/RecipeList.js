import React from "react";
import Recipe from './Recipe';
import "./App.css";

function RecipeList({ recipes, handleDelete }) {
  
  const recipesList = recipes.map(recipe => {
    return (
      <Recipe 
       className="recipes"
        name={ recipe.name }
        cuisine={ recipe.cuisine }
        link={ recipe.link }
        handleDelete={handleDelete}
        recipe_id={ recipe.recipe_id }
        key={ recipe.recipe_id }
      />
    )
  })

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
        <tbody>
          {recipesList}
        </tbody>
      </table>
    </div>
  );
}

export default RecipeList;
