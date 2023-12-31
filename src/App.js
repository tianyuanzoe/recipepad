import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleRecipe from "./pages/SingleRecipe";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import Search from "./pages/search";
import RecipeDetails from "./components/Details";
import Profile from "./pages/profile";
import AddEditRecipe from "./pages/AddEditRecipe";
import UserListTab from "./pages/userlist";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/addRecipe" element={<AddEditRecipe />} />
          <Route path="/editRecipe/:id" element={<AddEditRecipe />} />
          <Route path="/search/*" element={<Search />} />
          <Route path="/search/:search/*" element={<Search />} />
          <Route path="/Details/:recipeId/*" element={<RecipeDetails />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/profile/:userId/*" element={<Profile />} />
          <Route path="/userlist" element={<UserListTab />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
