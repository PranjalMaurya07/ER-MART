import { useState, useEffect, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });
  
  // Set axios authorization header whenever the token changes

//   useEffect(() => {
//     if (auth?.token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [auth.token]);

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         user: parseData?.user,
//         token: parseData?.token,
//       });
//     }
//   }, []);

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
