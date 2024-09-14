import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "startFetching":
      return { ...state, isLoading: true, error: "" };
    case "setCities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "rejected/loaded":
      return { ...state, isLoading: false, error: action.payload };
    case "addCity/loaded":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "deleteCity/loaded":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    case "setCurrentCity/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };

    default:
      break;
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, error, currentCity } = state;

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      dispatch({ type: "startFetching" });
      try {
        const response = await fetch("http://localhost:8000/cities", {
          Signal: controller.signal,
        });
        if (!response.ok) throw new Error("Network Error");
        const data = await response.json();
        dispatch({ type: "setCities/loaded", payload: data });
      } catch (err) {
        if (err.message !== "AbortController") {
          dispatch({ type: "rejected/loaded", payload: err.message });
        }
      }
    }
    fetchData();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    const controller = new AbortController();
    dispatch({ type: "startFetching" });
    try {
      const response = await fetch(`http://localhost:8000/cities/${id}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Network Error");
      const data = await response.json();
      dispatch({ type: "setCurrentCity/loaded", payload: data });
    } catch (err) {
      if (err.message !== "AbortController") {
        dispatch({ type: "rejected/loaded", payload: err.message });
      }
    }
  }, []);
  async function addCity(newCity) {
    dispatch({ type: "startFetching" });
    try {
      const response = await fetch("http://localhost:8000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Network Error");
      const data = await response.json();
      dispatch({ type: "addCity/loaded", payload: data });
    } catch (err) {
      if (err.message !== "AbortController") {
        dispatch({ type: "rejected/loaded", payload: err.message });
      }
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "startFetching" });
    try {
      const response = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network Error");
      dispatch({ type: "deleteCity/loaded", payload: id });
    } catch (err) {
      if (err.message !== "AbortController") {
        dispatch({ type: "rejected/loaded", payload: err.message });
      }
    }
  }

  const value = useMemo(() => {
    return {
      cities,
      isLoading,
      error,
      currentCity,
      getCity,
      addCity,
      deleteCity,
    };
  }, [cities, currentCity, error, isLoading]);
  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const content = useContext(CitiesContext);
  if (content === undefined)
    throw new Error("You can use Postprovider outside of Postcontext!");

  return content;
}

export { CitiesProvider, useCities };
