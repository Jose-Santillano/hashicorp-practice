import { useState } from "react";

// Componentes
import MenuSidebar from "./components/MenuSidebar";
import Home from "./views/Home";
import Users from "./views/Users";
import Secrets from "./views/Secrets";
import Workers from "./views/Workers";

function App() {
  // Estado para saber que vista se esta mostrando
  const [view, setView] = useState("home");

  return (
    <div className="h-screen flex ">
      <MenuSidebar setView={setView}/>

      {view === "home" && <Home />}

      {view === "users" && <Users />}

      {view === "secrets" && <Secrets />}

      {view === "workers" && <Workers />}
      
    </div>
  );
}

export default App;
