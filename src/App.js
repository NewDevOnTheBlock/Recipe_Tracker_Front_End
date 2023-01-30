import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Random from "./Random";
import RecipeCreate from "./RecipeCreate";
import RecipeList from "./RecipeList";
import { createRecipe, deleteRecipe, listRecipes } from "./utils/api"

function App() {
  const [recipes, setRecipes] = useState([]);

  const initialFormState = {
    name: "",
    cuisine: "",
    link: ""
  }
  const [formData, setFormData] = useState({ ...initialFormState })
  
  function loadRecipes(signal) {
    listRecipes(signal)
      .then(setRecipes)
      .catch(console.error)
  }

  // retrieve the list of recipes via useEffect
  useEffect(() => {
    const abortController = new AbortController();

    loadRecipes(abortController.signal)

    return () => abortController.abort()
  }, [recipes.length])
  
  // change handler for form data
  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  // submit handler needs to send info to the database instead of updating recipes in static data
  const handleSubmit = async (event) => {
    event.preventDefault();
    // use create recipe 
    try {
      await createRecipe(formData);
      setFormData({ ...initialFormState });
      await loadRecipes();
    } catch(err) {
      console.error(err)
    }
  }

  // delete hander needs to call a delete function and send the info to the database
  const handleDelete = async (recipe_id) => {
    try {
      await deleteRecipe(recipe_id);
      await loadRecipes();
    } catch (err) {
      console.error(err)
    }
  };
  
  return (
    <div className="App">
      <header>
        <h1>Delicious Food Recipes</h1>
      </header>
      <div style={{padding: "12px", textAlign: "center"}}>
        <Link to="/">
          <button style={{ marginRight: "10px" }}>Go home and view recipes</button>
        </Link>
        <Link to="/random">
          <button>Generate 5 random recipes</button>
        </Link>
      </div>

      <Routes>
        <Route exact path="/" element={
          <>
            <RecipeList
              recipes={recipes}
              handleDelete={handleDelete}
            />
            <RecipeCreate
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </>
        }/>

        <Route path="/random" element={
          <Random
            handleDelete={handleDelete}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;
