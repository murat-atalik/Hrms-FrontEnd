import Dashboard from "./layouts/Dashboard";
import Navi from "./layouts/Navi";
import { Container } from "@material-ui/core";
import FooterBar from "./layouts/FooterBar";
import Home from "./layouts/Home";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div style={{ backgroundColor: "#eceff1" }}>
      <div>
        <div>
          <Navi />
        </div>

        <div>
          {location.pathname === "/home" || location.pathname === "/" ? (
            <Home />
          ) : (
            <div style={{ paddingTop: "10em" }}>
              <Dashboard />
            </div>
          )}
        </div>

        <FooterBar />
      </div>
    </div>
  );
}

export default App;
