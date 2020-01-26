import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";
import { GET_ALL_RECEIPES } from "../Queries";

function App() {
  const { data, error, loading } = useQuery(GET_ALL_RECEIPES);
  if (loading) return "Loading";
  if (error) {
    console.log(error);
    return error.message;
  }
  console.log(data);
  return <div className="App">Home</div>;
}

export default App;
