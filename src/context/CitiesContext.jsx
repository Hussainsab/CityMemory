import React, { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "https://react-quiz-app-backend.onrender.com";
const CityContext = createContext();

const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    try {
      setLoading(true);
      let res = await fetch(`${BASE_URL}/cities`);
      let data = await res.json();
      setCities(data);
    } catch {
      alert("There was an error loading data");
    } finally {
      setLoading(false);
    }
  }

  async function getCity(id) {
    try {
      setLoading(true);
      let res = await fetch(`${BASE_URL}/cities/${id}`);
      let data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error getting city data");
    } finally {
      setLoading(false);
    }
  }

  async function createCity(city) {
    try {
      setLoading(true);
      let res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });
      let data = await res.json();
      setCities((cities) => [...cities, data]);
      // fetchCities();
    } catch {
      alert("There was an error getting city data");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities(cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting city data");
    } finally {
      setLoading(false);
    }
  }
  return (
    <CityContext.Provider
      value={{ cities, loading, getCity, currentCity, createCity, deleteCity }}
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
