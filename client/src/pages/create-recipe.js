import React,{useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const CreateRecipe = () => {
  const [errorMessage, setErrorMessage] = useState(null);

    const useGetUserId = () => {
        return window.localStorage.getItem("userID");
    }
    const userID = useGetUserId();

    const [recipe, setRecipe] = useState({
        
        name:"",
        ingredients: [],
        description: "",
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate()

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setRecipe({...recipe, [name]:value})
    }
    const handleIngredientChange = (event, index) =>{
        const { value} = event.target;
        const ingredients = recipe.ingredients
        ingredients[index] = value
        setRecipe({...recipe, ingredients: ingredients})
    }
    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients,""]})
    }
    const onSubmit = async (event) => {
      event.preventDefault();
    
      
      if (!recipe.name || !recipe.ingredients || !recipe.description || !recipe.instructions || !recipe.cookingTime || !recipe.imageUrl) {
        setErrorMessage("Please fill out all required fields.");
        return;
      }
    
      try {
        await axios.post("http://localhost:3001/recipes", recipe);
        alert("Recipe posted!");
        navigate("/");
      } catch (error) {
        console.error(error);
        
      }
    
      
      setErrorMessage(null);
    };
    
    return <div className="pb-52"> <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-2xl mt-8">
    <h2 className="text-2xl font-semibold mb-4 text-green-900">Add a new recipe</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 w-full border rounded"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
          Ingredients:
        </label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
            className="mt-1 p-2 w-full border rounded"
          />
        ))}
        <button
          onClick={addIngredient}
          type="button"
          className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Ingredient
        </button>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="mt-1 p-2 w-full border rounded"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Instructions:
        </label>
        <textarea
          id="instructions"
          name="instructions"
          className="mt-1 p-2 w-full border rounded"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL:
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="mt-1 p-2 w-full border rounded"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
          Cooking time (minutes):
        </label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          className="mt-1 p-2 w-full border rounded"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-4 ml-36 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 "
      >
        Post Recipe
      </button>
    </form>
    {errorMessage && (
  <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
)}
  </div>
  </div>
 };