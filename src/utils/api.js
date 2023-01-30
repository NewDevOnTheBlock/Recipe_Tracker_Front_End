// define API base url
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// define default headers for these functions to work with JSON-server
const headers = new Headers();
headers.append("Content-Type", "application/json");

// fetch JSON from specific url and handle errors, for use in this file
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

// function to be used for listing recipes
export async function listRecipes(signal) {
  const url = new URL(`${API_BASE_URL}/recipes`)
  return await fetchJson(url, { headers, signal }, [])
}

// function to be used for submitting new recipe
export async function createRecipe(recipe, signal) {
  const url = new URL(`${API_BASE_URL}/recipes`)
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: recipe }),
    signal,
  };

  return await fetchJson(url, options)
}

// function to be used for deleting a recipe
export async function deleteRecipe(recipe_id) {
    const url = new URL(`${API_BASE_URL}/recipes/${recipe_id}`)
    const options = {
        method: "DELETE",
        headers,
    };
    return await fetchJson(url, options, {})
}

// function to be used for updating recipe (not to be used yet)
// export async function updateRecipe(recipe_id, recipe, signal) {
//     const url = new URL(`${API_BASE_URL}/recipes/${recipe_id}`)
//     const options = {
//         method: "PUT",
//         headers,
//         body: JSON.stringify({ data: recipe })
//     }
//     return await fetchJson(url, options, {})
// }