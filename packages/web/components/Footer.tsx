import { AppBar, Toolbar } from "@mui/material";
import React, { useState } from "react";

import MicNoneTwoToneIcon from '@mui/icons-material/MicNoneTwoTone';
import AdjustIcon from '@mui/icons-material/Adjust';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import { css } from "@emotion/css";


interface RecordingProps{
    recording: boolean,
    btnClick: ()=>void,
    footerClick: (click: boolean)=>void
}

const Footer: React.FC<RecordingProps> = ({recording, btnClick, footerClick}) => {

    const [click, setClick] = useState(false)
    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        bottom: 30,
        left: 0,
        right: 0,
        margin: '0 auto'
    });

    // const appBarClick = () =>{
    //   setFooterClick(!footerClick)
    //   console.log("appBarClick")
    // }

    const appBarProps = {
      top: 'auto',
      bottom: 0,
      height: click===true?'30%':'15%'
    }

    return (
        <AppBar position="fixed" color="primary" sx={appBarProps} onClick={()=>{setClick(!click); footerClick(!click)}}>
          <StyledFab size="large" color="secondary" aria-label="add" onClick={btnClick}>
            {recording?<AdjustIcon sx={{ fontSize: 40}}/>:<MicNoneTwoToneIcon sx={{ fontSize: 40}}/>}
          </StyledFab>
        </AppBar>
    )

}

export default React.memo(Footer)
