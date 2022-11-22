import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { css } from '@emotion/css'

const Topbar: React.FC = () => {
    return (
        <>
            <div className={css` height: 10%;`}/>
            <AppBar sx={{
                height: '10%',
                position: 'fixed',
                paddingTop: 'env(safe-area-inset-top)',
                paddingLeft: `env(safe-area-inset-left)`,
                paddingRight: `env(safe-area-inset-right)`
                }} elevation={0}>
                <Toolbar sx={{height: '100%'}} variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="subtitle1" color="inherit" component="div">
                    VoiceR--
                    </Typography>
            </Toolbar>
            </AppBar>
        </>
    )

}

export default React.memo(Topbar)
