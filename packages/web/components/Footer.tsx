import { AppBar, Toolbar } from "@mui/material";
import React from "react";

import MicNoneTwoToneIcon from '@mui/icons-material/MicNoneTwoTone';
import AdjustIcon from '@mui/icons-material/Adjust';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';


interface RecordingProps{
    recording: boolean,
    btnClick: ()=>void
}

const Footer: React.FC<RecordingProps> = ({recording, btnClick}) => {

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        left: 0,
        right: 0,
        margin: '0 auto'
    });

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, height: '15%' }}>
          <Toolbar>
            <StyledFab size="large" color="secondary" aria-label="add" onClick={btnClick}>
              {recording?<AdjustIcon sx={{ fontSize: 40}}/>:<MicNoneTwoToneIcon sx={{ fontSize: 40}}/>}
            </StyledFab>
          </Toolbar>
        </AppBar>
    )

}

export default React.memo(Footer)
