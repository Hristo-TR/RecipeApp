import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home'
import {Auth} from './pages/auth'
import {CreateRecipe} from './pages/create-recipe'
import {SavedRecipes} from './pages/saved-recipes'
import {Navbar} from './components/navbar'
import {Footer} from './components/footer'
import {FullRecipe} from './pages/fullRecipe'
import {AllRecipes} from './pages/allRecipes'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/allrecipes" element={<AllRecipes/>}/>
          <Route path="/recipes/:recipeID" element={<FullRecipe />} />
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipe" element={<CreateRecipe/>}/>
          <Route path="/saved-recipes" element={<SavedRecipes/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
