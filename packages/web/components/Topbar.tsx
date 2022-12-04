import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { css } from '@emotion/css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'fixed',
        paddingTop: `env(safe-area-inset-top)`,
        paddingLeft: `env(safe-area-inset-left)`,
        paddingRight: `env(safe-area-inset-right)`
    },
}));

const Topbar: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <div className={css` height: 10%;`}/>
            <AppBar
                className={classes.appBar}
                elevation={0}>
                <Toolbar sx={{height: '100%'}} variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="subtitle1" color="inherit" component="div">
                    VoiceR
                    </Typography>
            </Toolbar>
            </AppBar>
        </>
    )

}

export default React.memo(Topbar)
