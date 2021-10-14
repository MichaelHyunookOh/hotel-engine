import React, { useState, useEffect } from "react";

export const Input = () => {
  const [items, setItems] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

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
        {items.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            <p> {item.stargazers_count}</p>
          </div>
        ))}
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
        <button type="submit">Search</button>
      </form>
      <div>{renderNames()}</div>
    </div>
  );
};
