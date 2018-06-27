import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/layout/NotFound";
import NavBar from "../../features/nav/NavBar/NavBar";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventForm from "../../features/event/EventForm/EventForm";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import ModalManager from "../../features/modals/ModalManager";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";

const AsyncHomePage = Loadable({
  loader: () => import("../../features/home/HomePage"),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route
                    path="/manage/:id"
                    component={UserIsAuthenticated(EventForm)}
                  />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(UserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(SettingsDashboard)}
                  />
                  <Route
                    path="/createEvent"
                    component={UserIsAuthenticated(EventForm)}
                  />
                  <Route path="/error" component={NotFound} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
