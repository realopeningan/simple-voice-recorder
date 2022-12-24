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

    const buttonProps = (recording:boolean)=> {
      return ({
        height: '80%',
        width: '30%',
        borderRadius: '50px',
        bgcolor: recording?'secondary.light': 'success.light',
        }
      )
    }

    return (
        <AppBar position="fixed" color="primary" sx={appBarProps}
          onClick={()=>{setClick(!click); footerClick(!click)}}>

          <Button variant="contained" sx={buttonProps(recording)} onClick={btnClick}>
          {recording?
            <Stack direction="column" alignItems="center" justifyContent={"center"}>
              <AlbumTwoToneIcon sx={{ fontSize: '800%'}}/>
              <Typography>Stop</Typography>
            </Stack>
            :
            <Stack direction="column" alignItems="center" justifyContent={"center"}>
              <MicExternalOnTwoToneIcon sx={{ fontSize: '800%'}}/>
              <Typography>Recording</Typography>
            </Stack>
            }
          </Button>
        </AppBar>
    )

}

export default React.memo(Footer)
