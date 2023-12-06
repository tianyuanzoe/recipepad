import React, {useState, useEffect} from "react";
import * as client from "./client";
import {Link, useParams, useNavigate} from "react-router-dom";

function Search() {
    const {search} = useParams();
    const [searchTerm, setSearchTerm] = useState(search || "beatles");
    const [results, setResults] = useState(null);
    const navigate = useNavigate();

    const findRecipe = async (search) => {
        const results = await client.findRecipe(search);
        setResults(results);
        setSearchTerm(search);
    };

    useEffect(() => {
        if (search) {
            findRecipe(search);
        }
    }, [search]);

    return (
        <div>
            <h1>Search</h1>
            <pre>{JSON.stringify()}</pre>
            <button onClick={
                    () => navigate(`/project/search/${searchTerm}`)
                }
                className="btn btn-primary float-end">
                Search
            </button>
            <input type="text" className="form-control w-75" placeholder="Search..."
                value={searchTerm}
                onChange={
                    (event) => {
                        setSearchTerm(event.target.value);
                    }
                }/>
            <h2>Results</h2>
            <div className="container-fluid me-5">
                <div className="row ">
                    {
                    results && results.map((recipe, index) => (
                        <div className="col col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 "
                            key={index}>
                            <div className="card h-100 ">
                                <img src={
                                        recipe.strMealThumb
                                    }
                                    alt={
                                        recipe.strMeal
                                    }/>
                                <Link to={
                                    `/project/details/${
                                        recipe.idMeal
                                    }`
                                }>
                                    <h3>{
                                        recipe.strMeal
                                    }</h3>

                                </Link>
                            </div>
                        </div>
                    ))
                } </div>
            </div>
        </div>
    );
}

export default Search;
