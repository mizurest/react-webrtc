import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import VideoLocal from './VideoLocal';
import VideoRemote from './VideoRemote'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const VideoGrid = (props) => {
    const { rtcClient } = props;
    const classes = useStyles();

    if(rtcClient === null) return <></>;

        return (
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <VideoLocal rtcClient={rtcClient}/>
              </Grid>
              <Grid item xs={6}>
                <VideoRemote rtcClient={rtcClient}/>
              </Grid>
            </Grid>
          </div>
    );
}

export default VideoGrid;