import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export const FullRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    imageUrl: "",
    description: "",
    instructions: "",
    cookingTime: 0,
    ingredients: [],
  });
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const { recipeID } = useParams();
  console.log(recipe.ingredients);

  const useGetUserId = () => {
    return window.localStorage.getItem("userID");
  };
  const userID = useGetUserId();
  useEffect(() => {
    const fetchRecipe = async (recipeID) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${recipeID}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe(recipeID);
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recipes/${recipeID}/${userID}`
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  function isRecipeSaved(recipe, savedRecipes) {
    if (savedRecipes && Array.isArray(savedRecipes)) {
      return savedRecipes.includes(recipe);
    }
    return false;
  }

  return (
    <div className="flex justify-center min-w-full min-h-screen pb-32">
      <div className="flex flex-col items-center w-3/4 pt-8 text-center">
        <h1
          id="recipes"
          className="font-semibold text-6xl pb-12 text-green-800"
        >
          {recipe.name} 
        </h1>
        
        <div className="flex flex-col lg:flex-row w-full justify-center">
          <div className="w-full lg:w-1/4">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className=" rounded-xl w-full  object-contain"
            />
            
          </div>
          <div className="flex flex-col text-left w-full lg:w-3/4">
            <div className="px-4   text-lg">
              <p>{recipe.description}</p>
            </div>
            <p className="font-semibold text-gray-500 ml-4 mt-4">
                Cooking Time: {recipe.cookingTime} min
              </p>
            <div className="px-4  text-lg">
              <h3 className="text-2xl font-semibold text-green-900 mt-4">
                Ingredients
              </h3>
              <ul className="list-disc pl-6 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4  text-lg">
              <h3 className="text-2xl font-semibold text-green-900 mt-4 mb-3">
                Instructions
              </h3>
              {recipe.instructions}
            </div>
            <div className="flex flex-row justify-end px-4 mt-4">
              
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id, savedRecipes)}
                type="button"
                className="text-green-700 mb-3 border border-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
