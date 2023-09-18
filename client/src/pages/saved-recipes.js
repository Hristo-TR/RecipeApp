import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const useGetUserId = () => {
    return window.localStorage.getItem("userID");
  };
  const userID = useGetUserId();
  const fetchSavedRecipe = async () => {
   try {
     const response = await axios.get(
       `http://localhost:3001/recipes/savedRecipes/${userID}`
     );
     setSavedRecipes(response.data.savedRecipes);
   } catch (error) {
     console.error(error);
   }
 };
  useEffect(() => {
    fetchSavedRecipe();
  }, []);
  const unsaveRecipe = async (recipeID) => {
   try{
   await axios.delete(`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`)
   fetchSavedRecipe();
   }
   catch(error){
      console.error(error);
   }
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen pt-12 text-center pb-52">
      <h1 className="font-semibold text-6xl pb-12 text-green-800">
        Liked Recipes
      </h1>
      <ul className="grid grid-cols-1 gap-12 mt-8 w-2/3 md:grid-cols-3">
        {savedRecipes.map((recipe) => (
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
            <div className="p-4">
              <h2 className="font-bold text-2xl text-green-900">
                {recipe.name}
              </h2>
            </div>
            <div className="px-4  line-clamp-3 h-20 text-lg">
              <p>{recipe.description}</p>
            </div>
            <div className="flex flex-row justify-between px-4">
              <p className="font-semibold text-gray-500">
                {recipe.cookingTime} min
              </p>
              <button
                onClick={() => unsaveRecipe(recipe._id)} 
                type="button"
                className="text-red-700 mb-3 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                </svg>{" "}
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
