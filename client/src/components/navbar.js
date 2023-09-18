import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const myStyle =
    "text-2xl px-5 py-3 text-green-900 font-semibold hover:text-green-600 duration-300";
  const myStyle2 =
    "text-2xl px-5 py-3 text-green-900 font-semibold hover:text-green-600 duration-300 border-b-2 w-full text-right ";
  return (
    <div className=" bg-white z-10 sticky top-0 w-screen bg-transparent h-14 flex flex-row justify-between shadow-lg">
      <div className="font-signature text-5xl text-green-900 font-semibold ">
        {" "}
        Tasty Food
      </div>

      <div className="hidden lg:flex flex-row justify-evenly bg-white rounded-full ">
        <Link to="/" className={myStyle}>
          Home
        </Link>
        <Link to="/allrecipes" className={myStyle}>
          Recipes
        </Link>

        {!cookies.access_token ? (
          <></>
        ) : (
          <>
            <Link to="/saved-recipes" className={myStyle}>
              Liked Recipes
            </Link>{" "}
            <Link to="/create-recipe" className={myStyle}>
              Add New Recipe
            </Link>
          </>
        )}
      </div>

      <div className=" hidden lg:flex align-middle justify-center">
        {!cookies.access_token ? (
          <Link to="/auth" className={myStyle}>
            Log in
          </Link>
        ) : (
          <>
            <button
              className="text-2xl px-5 py-3 text-orange-400 font-semibold  hover:text-red-500 duration-300"
              onClick={logout}
            >
              Logout
            </button>{" "}
          </>
        )}
      </div>
      <button
        className="flex lg:hidden"
        onClick={() => {
          setNav(!nav);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          stroke-width="2.5"
          stroke="currentColor"
          className="w-6 h-6 mr-3 my-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {nav && (
        <>
          <ul className={`flex flex-col justify-center items-end absolute top-0 right-0 w-3/4 h-screen bg-white ${nav ? 'slide-in-right' : ''}`}>
            <li>
              <button
                className="flex lg:hidden"
                onClick={() => {
                  setNav(!nav);
                }}
              >
                <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          stroke-width="2.5"
          stroke="currentColor"
          className="w-6 h-6 mr-3 my-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
              </button>
            </li>
            <li className={myStyle2}>
              <Link onClick={() => setNav(!nav)} to="/" smooth duration={500}>
                Home
              </Link>
            </li>
            <li className={myStyle2}>
              <Link
                onClick={() => setNav(!nav)}
                to="/allrecipes"
                smooth
                duration={500}
              >
                Recipes
              </Link>
            </li>

            {!cookies.access_token ? (
              <li className={myStyle2}>
                <Link
                  onClick={() => setNav(!nav)}
                  to="/auth"
                  smooth
                  duration={500}
                >
                  Log in
                </Link>
              </li>
            ) : (
              <>
                {" "}
                <li className={myStyle2}>
                  <Link
                    onClick={() => setNav(!nav)}
                    to="/saved-recipes"
                    smooth
                    duration={500}
                  >
                    Liked Recipes
                  </Link>
                </li>
                <li className={myStyle2}>
                  <Link
                    onClick={() => setNav(!nav)}
                    to="/create-recipe"
                    smooth
                    duration={500}
                  >
                    Add New Recipe
                  </Link>
                </li>{" "}
                <button
                  className="text-2xl px-5 py-3 text-orange-400 font-semibold  hover:text-red-500 duration-300"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};
