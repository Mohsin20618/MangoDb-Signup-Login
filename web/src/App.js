import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

function App() {
  let history = useHistory();
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              history.push("/");
            }}
          >
            Database
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                history.push("/");
              }}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                history.push("/Sign");
              }}
            >
              Signup
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                history.push("/Log");
              }}
            >
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/Log">
          <Login />
        </Route>

        <Route path="/Sign">
          <Signup />
        </Route>

        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
