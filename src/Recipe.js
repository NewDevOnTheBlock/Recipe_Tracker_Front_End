import React from 'react'
import "./App.css";

function Recipe({ recipe_id, name, cuisine, link, handleDelete }) {
    return (
        <tr>
            <td>{ name }</td>
            <td>{ cuisine }</td>
            <td className="content_td"><p>{ link }</p></td>
            <td><button name="delete" onClick={ () => handleDelete(recipe_id) }>Delete</button></td>
        </tr>
    )
}

export default Recipe;