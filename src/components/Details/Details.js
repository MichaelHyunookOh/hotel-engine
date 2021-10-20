import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const Details = (props) => {
  const { state } = props.location;
  const history = useHistory();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  useEffect(() => {
    setName(window.localStorage.getItem("name"));
    setLanguage(window.localStorage.getItem("language"));
  }, []);

  console.log(props.location);
  return (
    <div>
      <h1>{name}</h1>
      {/* <p>{state.html_url}</p>
      <p>{state.description}</p>
      <p>{state.stargazers_count}</p> */}
      <p>{language}</p>
    </div>
  );
};
