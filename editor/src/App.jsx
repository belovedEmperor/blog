import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import UserContext from "./context/UserContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "posts", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setPosts(data));
    fetch(import.meta.env.VITE_API_URL + "auth/me", { credentials: "include" })
      .then((response) => {
        if (!response.ok) return undefined;
        return response.json();
      })
      .then((data) => setUser(data));
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Outlet context={{ posts, setPosts }} />
      </UserContext.Provider>
    </>
  );
}

export default App;
