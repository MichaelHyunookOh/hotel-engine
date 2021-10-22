import React, { useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

export const Search = () => {
  const [items, setItems] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  //function to store state values for details page
  const storeValue = (key, value) => {
    window.localStorage.setItem(key, value);
  };

  //default (best match) submit function
  const handleSubmitDefault = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/search/repositories?q=${search}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setItems(response.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sort by stars submit function
  const handleSubmitStars = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/search/repositories?q=${search}&sort=stars`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setItems(response.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //renders repos based on results from search
  //first filter filters list according to the language that is input
  //second filter filter outs any repos that have a null value for language
  const renderRepos = () => {
    return (
      <div className="repoList">
        {items
          .filter((item) =>
            filter && item.language
              ? item.language.toLowerCase() === filter.toLowerCase()
              : item
          )
          .filter((item) => (filter ? !!item.language : item))
          .map((item, index) => (
            <div className="repoRow">
              <div className="repoCard">
                <Link
                  to={{
                    pathname: `/details/${item.id}`,
                    state: item,
                  }}
                  // stores all needed values for details page
                  onClick={() => {
                    storeValue("name", item.name);
                    storeValue("language", item.language);
                    storeValue("url", item.html_url);
                    storeValue("description", item.description);
                    storeValue("stars", item.stargazers_count);
                    storeValue("forks", item.forks_count);
                    storeValue("issues", item.open_issues);
                  }}
                  target="_blank"
                  className="link"
                >
                  <div key={item.id} className="repo">
                    <p>Name: {item.name}</p>
                    <p>Owner: {item.owner.login}</p>
                    <p>Description: {item.description}</p>
                    <p>Stars: {item.stargazers_count}</p>
                    <p>Language: {item.language}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="searchContainer">
      <form
        // Default sort on submit is by best match but switches to stars when sort value is changed
        onSubmit={
          sortValue === "Stars" ? handleSubmitStars : handleSubmitDefault
        }
      >
        <input
          type="text"
          id="search"
          placeholder="Search Repositories"
          required
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
        <select
          name="sort"
          id="sort"
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option>Best Match</option>
          <option>Stars</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Language"
          onChange={(e) => setFilter(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* simple error handling if repos don't render */}
      {items ? (
        renderRepos()
      ) : (
        <p className="errorMessage">something went wrong</p>
      )}
    </div>
  );
};
