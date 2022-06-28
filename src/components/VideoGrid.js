import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import VideoLocal from './VideoLocal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const VideoGrid = (props) => {
    const {localName, RemoteName} = props;
    const classes = useStyles();

        return (
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <VideoLocal localName={localName}/>
              </Grid>
              <Grid item xs={6}>
              </Grid>
            </Grid>
          </div>
    );
}

export default VideoGrid;