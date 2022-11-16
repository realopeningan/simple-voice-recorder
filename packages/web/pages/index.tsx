import {
  VoiceRecorder,
  VoiceRecorderPlugin,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus
} from 'capacitor-voice-recorder';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
//import { css } from '@emotion/react'
//import styled from '@emotion/styled'
import { css } from '@emotion/css'
import MicNoneTwoToneIcon from '@mui/icons-material/MicNoneTwoTone';
import AdjustIcon from '@mui/icons-material/Adjust';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import { AppBar, createTheme, Icon, IconButton, List, ListItem, ListItemText, makeStyles, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
function Home() {

	const [base64Sound, setBase64Sound] = useState<undefined|string>(undefined)
  const [nowRecording, setNowRecording] = useState(false)


  useEffect(()=>{
    try{
      VoiceRecorder.canDeviceVoiceRecord().then(
        (result: GenericResponse) => console.log(result.value)
      )

      VoiceRecorder.requestAudioRecordingPermission().then(
        (result: GenericResponse) => console.log(result.value)
      )

      VoiceRecorder.hasAudioRecordingPermission().then(
        (result: GenericResponse) => console.log(result.value)
      )
    }catch(e){
      console.log("error", e)
    }
  }, [])

  const btnClick = () =>{
    console.log("click btn")
    if(nowRecording){
      stopRecording()
    }else{
      startRecording()
    }
  }

  const startRecording = () =>{
    setNowRecording(true)
    VoiceRecorder.startRecording()
    .then((result: GenericResponse) => console.log(result.value))
    .catch(error => console.log(error))
  }

  const stopRecording = () =>{
    setNowRecording(false)
    VoiceRecorder.stopRecording()
    .then((result: RecordingData) => {
      console.log(result.value)
      setBase64Sound(result.value.recordDataBase64)
    })
    .catch(error => console.log(error))
  }

  const pauseRecording = () =>{
    VoiceRecorder.pauseRecording()
    .then((result: GenericResponse) => console.log(result.value))
    .catch(error => console.log(error))
  }


  const resumeRecording = () =>{
    VoiceRecorder.resumeRecording()
    .then((result: GenericResponse) => console.log(result.value))
    .catch(error => console.log(error))
  }

  const getStatus = () =>{
    VoiceRecorder.getCurrentStatus()
    .then((result: CurrentRecordingStatus) => console.log(result.status))
    .catch(error => console.log(error))
  }

  const playRecording = () =>{
    if(base64Sound!==undefined){
      const mimeType = 'audio/aac'  // from plugin
      const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`)
      console.log("base64Sound", base64Sound)
      audioRef.oncanplaythrough = () => audioRef.play()
      audioRef.load()
    }
  }

  const color = 'white'
  const div1Style=css`
    display: flex;
    flex-direction: column;
    height: 100vh
  `
  const div2Style=css`
    padding: 10px;
    background-color: #B0BEC5;
    font-size: 24px;
    height: 5%;
    &:hover {
      color: ${color};
    }
  `
  const div3Style=css`
    padding: 10px;
    height: 80%;
  `
  const div4Style=css`
    padding: 10px;
    background-color: #F5F5F5;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: 0,
    right: 0,
    margin: '0 auto'
  });

  let theme = createTheme({
    palette: {
      primary: {
        main: '#f5f5f5',
      },
      secondary: {
        main: '#fafafa',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={div1Style}>
        <div className={div2Style}>
        </div>
        <AppBar sx={{
          height: '5%',
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: `env(safe-area-inset-left)`,
          paddingLeft: `env(safe-area-inset-left)`,
         }} elevation={0}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              VoiceR
            </Typography>
          </Toolbar>
        </AppBar>

        <div
          className={div3Style}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemText primary="Sample1" secondary="Jan 9, 2014" onClick={playRecording}/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Sample2" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Sample3" secondary="July 20, 2014" />
            </ListItem>
          </List>
        </div>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, height: '15%' }}>
          <Toolbar>
            <StyledFab size="large" color="secondary" aria-label="add" onClick={btnClick}>
              {nowRecording?<AdjustIcon sx={{ fontSize: 40}}/>:<MicNoneTwoToneIcon sx={{ fontSize: 40}}/>}
            </StyledFab>
          </Toolbar>
        </AppBar>
        {/* <Box sx={{ '& button': { m: 1 }, 'display': 'flex', 'flexDirection': 'column'}}>
          <Button variant="contained" onClick={startRecording}>Recording Start 1</Button>
          <Button variant="contained" onClick={stopRecording}>Recording Stop 2</Button>
          <Button variant="contained" onClick={pauseRecording}>Recording Pause 3</Button>
          <Button variant="contained" onClick={resumeRecording}>Recording Resume</Button>
          <Button variant="outlined" onClick={playRecording}>Playing</Button>
          <Button variant="outlined" onClick={getStatus}>GetStatus</Button>
        </Box> */}

      </div>
    </ThemeProvider>
  )
}

export default Home
