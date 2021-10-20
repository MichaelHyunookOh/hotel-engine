import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Input = () => {
  const [items, setItems] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const storeValue = (key, value) => {
    window.localStorage.setItem(key, value);
  };

  const handleSubmitDefault = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/search/repositories?q=${search}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setItems(response.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitStars = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/search/repositories?q=${search}&sort=stars`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setItems(response.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderNames = () => {
    return (
      <div>
        {items
          .filter((item) =>
            filter && item.language
              ? item.language.toLowerCase() === filter.toLowerCase()
              : item
          )
          .filter((item) => (filter ? !!item.language : item))
          .map((item, index) => (
            <Link
              to={{
                pathname: `/details/${item.id}`,
                state: item,
              }}
              onClick={() => {
                storeValue("name", item.name);
                storeValue("language", item.language);
              }}
              target="_blank"
            >
              <div key={item.name}>
                <p>{item.name}</p>
                <p> {item.stargazers_count}</p>
                <p> {item.language}</p>
              </div>
            </Link>
          ))}
        {/* {items.map((item, index) => (
          <Link
            to={{
              pathname: `/details/${index}`,
              state: items,
            }}
          >
            <div key={index}>
              <p>{item.name}</p>
              <p> {item.stargazers_count}</p>
              <p> {item.language}</p>
            </div>
          </Link>
        ))} */}
      </div>
    );
  };
  console.log(search);
  console.log(sortValue);
  return (
    <div>
      <form
        onSubmit={
          sortValue === "Stars" ? handleSubmitStars : handleSubmitDefault
        }
      >
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <select
          name="sort"
          id="sort"
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option>Best Match</option>
          <option>Stars</option>
        </select>
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div>{items ? renderNames() : null}</div>
    </div>
  );
};
