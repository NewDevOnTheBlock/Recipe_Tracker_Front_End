import React from 'react'
import "./App.css";

function RecipeCreate({formData, handleChange, handleSubmit}) {

  return (
    <form name="create" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="name">
                Name:
                <input 
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </label>
            </td>

            <td>
              <label htmlFor="cuisine">
                Cuisine:
                <input 
                  id="cuisine"
                  type="text"
                  name="cuisine"
                  onChange={handleChange}
                  value={formData.cuisine}
                  required
                />
              </label>
            </td>

            <td>
              <label htmlFor="link">
                Link:
                <input
                  id="link"
                  type="text"
                  name="link"
                  onChange={handleChange}
                  value={formData.link}
                  required
                  style={{ width: "450px", textAlign: "left" }}
                />
              </label>
            </td>
            <td>
              <button type="submit">Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default RecipeCreate;
