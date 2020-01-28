import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_RECEIPES } from "../Queries/query";

function App() {
  const { data, error, loading } = useQuery(GET_ALL_RECEIPES);
  if (loading) return "Loading";
  if (error) {
    return error.message;
  }
  return <div className="App">Home</div>;
}

export default App;
