import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

function getCookie(name) {
  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (!cookieValue) {
    return null;
  }

  return decodeURIComponent(cookieValue.substring(name.length + 1));
}

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionMessage: "",
      actionPending: false,
    };

    this.handleAction = this.handleAction.bind(this);
  }

  async handleAction(action) {
    if (this.state.actionPending) {
      return;
    }

    this.setState({ actionPending: true, actionMessage: "" });

    try {
      const response = await action();
      const responseBody = await response.json().catch(() => ({}));

      if (!response || !response.ok) {
        if (
          response &&
          response.status === 403 &&
          responseBody.error &&
          responseBody.error !== "app_permission"
        ) {
          const authResponse = await fetch("/spotify/get-auth-url");
          const authData = await authResponse.json();

          this.setState({
            actionMessage: "Reconnect Spotify to enable playback controls.",
          });
          window.location.replace(authData.url);
          return;
        }

        this.setState({
          actionMessage:
            response && response.status === 403 && responseBody.error === "app_permission"
              ? "You do not have permission for that action."
              : responseBody.error || "Action could not be completed right now.",
        });
        return;
      }

      if (this.props.onSongAction) {
        this.props.onSongAction();
      }
    } catch (error) {
      this.setState({
        actionMessage: "Action could not be completed right now.",
      });
      console.error(error);
    } finally {
      this.setState({ actionPending: false });
    }
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };
    return fetch("/spotify/skip", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };
    return fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };
    return fetch("/spotify/play", requestOptions);
  }

  render() {
    const songProgress = this.props.duration
      ? (this.props.time / this.props.duration) * 100
      : 0;
    const canPause = this.props.isHost || this.props.guestCanPause;

    return (
      <Card className="music-player-card">
        <CardContent className="music-player-content">
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid item xs={12} md={4} className="music-player-artwork-wrap">
              <img
                className="music-player-artwork"
                src={this.props.image_url}
                alt={this.props.title}
              />
            </Grid>
            <Grid item xs={12} md={8} className="music-player-details">
              <Typography component="h5" variant="h5" className="music-player-title">
                {this.props.title}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1" className="music-player-artist">
                {this.props.artist}
              </Typography>
              <div className="music-player-controls">
                <Button
                  className={`music-player-action ${this.props.is_playing ? "is-active" : ""}`}
                  variant="contained"
                  color="primary"
                  disabled={!canPause}
                  onClick={() => {
                    this.handleAction(
                      this.props.is_playing ? this.pauseSong.bind(this) : this.playSong.bind(this)
                    );
                  }}
                  startIcon={this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                >
                  {this.props.is_playing ? "Pause" : "Play"}
                </Button>
                <Button
                  className="music-player-votes"
                  variant="contained"
                  disabled={this.state.actionPending}
                  onClick={() => this.handleAction(this.skipSong.bind(this))}
                  endIcon={<SkipNextIcon fontSize="small" />}
                >
                  <span>
                    {this.props.votes} / {this.props.votes_required}
                  </span>
                </Button>
              </div>
              {this.state.actionMessage ? (
                <Typography
                  variant="body2"
                  color="error"
                  className="music-player-message"
                >
                  {this.state.actionMessage}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <LinearProgress
          className="music-player-progress"
          variant="determinate"
          value={songProgress}
        />
      </Card>
    );
  }
}
