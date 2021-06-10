import "semantic-ui-css/semantic.min.css";
import Dashboard from "./layouts/Dashboard";
import Navi from "./layouts/Navi";
import { Container } from "semantic-ui-react";
import FooterBar from "./layouts/FooterBar";

function App() {
  return (
    <div className="App">
      <div style={{ minHeight: "100vh" }}>
        <Navi />
        <Container className="main">
          <Dashboard />
        </Container>
      </div>
      <div>
        <FooterBar />
      </div>
    </div>
  );
}

export default App;
