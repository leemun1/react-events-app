import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";

import EventList from "../EventList/EventList";
import { getEventsForDashboard } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const mapDispatchToProps = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  componentDidMount() {
    this.props.getEventsForDashboard();
  }

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
