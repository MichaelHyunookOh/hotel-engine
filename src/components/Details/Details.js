import React, { useEffect, useState } from "react";

export const Details = (props) => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [forks, setForks] = useState("");
  const [issues, setIssues] = useState("");

  //on render useEffect retrieves needed data from local storage and sets each one in state
  useEffect(() => {
    setName(window.localStorage.getItem("name"));
    setLanguage(window.localStorage.getItem("language"));
    setUrl(window.localStorage.getItem("url"));
    setDescription(window.localStorage.getItem("description"));
    setStars(window.localStorage.getItem("stars"));
    setForks(window.localStorage.getItem("forks"));
    setIssues(window.localStorage.getItem("issues"));
  }, []);

  return (
    <div>
      <h1>Name: {name}</h1>
      <p>
        URL:{" "}
        <a href={url} rel="noreferrer" target="_blank">
          {url}
        </a>
      </p>
      <p>Description: {description}</p>
      <p>Stars: {stars}</p>
      <p>Language: {language}</p>
      <p>Forks: {forks}</p>
      <p>Open Issues: {issues}</p>
    </div>
  );
};
