import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

import MicExternalOnTwoToneIcon from '@mui/icons-material/MicExternalOnTwoTone';
import AlbumTwoToneIcon from '@mui/icons-material/AlbumTwoTone';

interface RecordingProps{
    recording: boolean,
    btnClick: ()=>void,
    footerClick: (click: boolean)=>void
}

const Footer: React.FC<RecordingProps> = ({recording, btnClick, footerClick}) => {
    const [click, setClick] = useState(false)
    const appBarProps = {
      top: 'auto',
      bottom: 0,
      height: '15%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }

    const buttonProps = {
      height: '70%',
      width: '25%',
      borderRadius: '20px'
    }

    console.log("recording", recording)
    return (
        <AppBar position="fixed" color="primary" sx={appBarProps}
          onClick={()=>{setClick(!click); footerClick(!click)}}>
          {recording?
              <Button variant="contained" sx={buttonProps} color={"secondary"} onClick={btnClick}>
                <AlbumTwoToneIcon sx={{ fontSize: '300%'}}/>
              </Button>
            :
              <Button variant="contained" sx={buttonProps} color={"success"} onClick={btnClick}>
                  <MicExternalOnTwoToneIcon sx={{ fontSize: '300%'}}/>
              </Button>
            }

        </AppBar>
    )

}

export default React.memo(Footer)
