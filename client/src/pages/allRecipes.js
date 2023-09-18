import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';

export const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const useGetUserId = () => {
    return window.localStorage.getItem("userID");
  };
  const userID = useGetUserId();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
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

    fetchRecipe();
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
    <>

      <div className="flex flex-col justify-center items-center w-screen pt-8 pb-52 text-center">
        <h1 id="recipes" className="font-semibold text-6xl pb-12 text-green-800">
          All Recipes
        </h1>
        <ul className="grid grid-cols-1 gap-12 mt-8 w-2/3 md:grid-cols-3">
          {recipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
            <li
              key={recipe._id}
              className="flex flex-col justify-between border rounded-xl shadow-2xl h-full w-full text-left transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full rounded-t-xl h-1/2 max-h-80 object-cover"
              />
              <div className=" p-4 ">
                <h2 className=" font-bold text-2xl text-green-900">{recipe.name}</h2>
              </div>
              <div className="px-4 line-clamp-3 h-20 text-lg">
                <p>{recipe.description}</p>
              </div>
              <div className="flex flex-row justify-between px-4 ">
                <p className="font-semibold text-gray-500">
                  {recipe.cookingTime} min
                </p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id, savedRecipes)}
                  type="button"
                  className="text-green-700 mb-3 border border-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500"
                >
                  <svg
                    class="w-5 h-5"
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
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
