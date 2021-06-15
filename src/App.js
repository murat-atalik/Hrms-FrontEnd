import "semantic-ui-css/semantic.min.css";
import Dashboard from "./layouts/Dashboard";
import Navi from "./layouts/Navi";
import { Container } from "@material-ui/core";
import FooterBar from "./layouts/FooterBar";
import Home from "./layouts/Home";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div style={{ minHeight: "100vh" }}>
        <Navi />

        {location.pathname === "/home" || location.pathname === "/" ? (
          <Home />
        ) : (
          <Container style={{ marginTop: "4em" }}>
            <Dashboard />
          </Container>
        )}
      </div>
      <div>
        <FooterBar />
      </div>
    </div>
  );
}

export default App;
