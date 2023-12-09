import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/Details';
import Profile from './components/Profile';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<RecipeDetails/>}/>
      <Route path='/Details/:recipeId' element={<RecipeDetails/>}/>
      <Route path='/Profile/:userId' element={<Profile/>}/>
    </Routes>
   </Router>
  );
}

export default App;
