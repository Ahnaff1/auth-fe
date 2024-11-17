import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap"; 
import { Link, Redirect, Route, Switch } from "react-router-dom"; 
import Cookies from "universal-cookie";
import Account from "./Account";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";

// Create an instance of cookies to manage cookie state
const cookies = new Cookies();

function App() {
  // Check if the user is logged in by checking if the TOKEN cookie exists
  const token = cookies.get("TOKEN");

  return (
    <Container>
      {/* Header with Navbar for better navigation */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">React Authentication Test</Navbar.Brand>
          <Nav className="ml-auto">
            {/* Show the Home link only if user is not logged in */}
            {!token && <Nav.Link as={Link} to="/">Home</Nav.Link>}

            {/* Always show the Dashboard link if user is logged in */}
            {token && <Nav.Link as={Link} to="/auth">Dashboard</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>

      {/* Routes */}
      <Switch>
        {/* Home Route: Only show the Account component if not logged in */}
        <Route exact path="/">
          {token ? <Redirect to="/auth" /> : <Account />}
        </Route>

        {/* Protected Route: Show AuthComponent only if logged in */}
        <ProtectedRoutes path="/auth" component={AuthComponent} />
      </Switch>
    </Container>
  );
}

export default App;
