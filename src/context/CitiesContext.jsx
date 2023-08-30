import React, { createContext, useContext, useEffect, useReducer } from "react";
const BASE_URL = "https://react-quiz-app-backend.onrender.com";
const CityContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  err: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
      };
    case "rejected":
      return { ...state, loading: false, err: action.payload };
    default:
      throw new Error("jdhfs");
  }
}

const CityProvider = ({ children }) => {
  const [{ cities, loading, currentCity, err }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      let res = await fetch(`${BASE_URL}/cities`);
      let data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "faild to fetch cities data...." });
    }
  }

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      let res = await fetch(`${BASE_URL}/cities/${id}`);
      let data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "faild to fetch city data...." });
    }
  }

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      let res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });
      let data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "faild to create city...." });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "faild to delete city...." });
    }
  }
  return (
    <CityContext.Provider
      value={{
        cities,
        loading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
        err,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

function useCities() {
  const context = useContext(CityContext);
  return context;
}

export { CityProvider, useCities };
