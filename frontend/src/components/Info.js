import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return {
      title: "Join a room in seconds",
      subtitle: "Enter a room code and jump into the shared queue.",
      steps: [
        "Get the room code from the host.",
        "Paste it into the join form.",
        "Start voting and listening together.",
      ],
    };
  }

  function createInfo() {
    return {
      title: "Create your own listening room",
      subtitle: "Set the room rules, invite friends, and control the session.",
      steps: [
        "Choose how many votes are needed to skip.",
        "Decide whether guests can pause playback.",
        "Share the room code and start the party.",
      ],
    };
  }

  const content = page === pages.JOIN ? joinInfo() : createInfo();

  return (
    <div className="info-page">
      <div className="info-bg-shape info-bg-shape-left" />
      <div className="info-bg-shape info-bg-shape-right" />

      <Grid container justify="center" alignItems="center" className="info-shell">
        <Grid item xs={12} md={10} lg={8}>
          <Card className="info-card">
            <CardContent className="info-card-content">
              <div className="info-hero">
                <Typography variant="overline" className="info-kicker">
                  House Party
                </Typography>
                <Typography component="h3" variant="h3" className="info-title">
                  Shared music, one room.
                </Typography>
                <Typography variant="body1" className="info-subtitle">
                  Create a room, share the code, and let everyone help control the playlist.
                </Typography>
              </div>

              <div className="info-toggle-row">
                <Button
                  variant={page === pages.JOIN ? "contained" : "outlined"}
                  color="primary"
                  className="info-toggle-button"
                  onClick={() => setPage(pages.JOIN)}
                >
                  Join
                </Button>
                <Button
                  variant={page === pages.CREATE ? "contained" : "outlined"}
                  color="secondary"
                  className="info-toggle-button"
                  onClick={() => setPage(pages.CREATE)}
                >
                  Create
                </Button>
              </div>

              <Divider className="info-divider" />

              <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12} md={5}>
                  <div className={`info-focus info-focus-${page === pages.JOIN ? "join" : "create"}`}>
                    <Typography variant="subtitle2" className="info-focus-label">
                      {page === pages.JOIN ? "Join page" : "Create page"}
                    </Typography>
                    <Typography variant="h5" className="info-focus-title">
                      {content.title}
                    </Typography>
                    <Typography variant="body2" className="info-focus-copy">
                      {content.subtitle}
                    </Typography>
                  </div>
                </Grid>

                <Grid item xs={12} md={7}>
                  <div className="info-steps">
                    {content.steps.map((step, index) => (
                      <div key={step} className="info-step">
                        <div className="info-step-index">0{index + 1}</div>
                        <Typography variant="body1" className="info-step-copy">
                          {step}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>

              <div className="info-actions">
                <Button
                  className="info-nav-button"
                  variant="contained"
                  color="default"
                  onClick={() => {
                    page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
                  }}
                  startIcon={page === pages.CREATE ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                >
                  {page === pages.CREATE ? "Back to Join" : "See Create"}
                </Button>
                <Button color="secondary" variant="contained" to="/" component={Link}>
                  Back Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
