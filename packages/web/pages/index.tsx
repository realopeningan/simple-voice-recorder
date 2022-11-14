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
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import MicNoneTwoToneIcon from '@mui/icons-material/MicNoneTwoTone';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Icon, IconButton, List, ListItem, ListItemText } from '@mui/material';
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

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      height: 100vh
    `}>
      <div
        className={css`
          padding: 10px;
          background-color: #B0BEC5;
          font-size: 24px;
          height: 5%;
          &:hover {
            color: ${color};
          }
        `}
      >
        Simple Voice Recorder
      </div>
      <div
        className={css`
          padding: 10px;
          height: 80%;
        `}>
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
      <div
        className={css`
          padding: 10px;
          background-color: #F5F5F5;
          height: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        >
        <div onClick={btnClick}>
          <IconButton aria-label="mic" disabled color="primary">
            {nowRecording?<AdjustIcon sx={{ fontSize: 60}}/>:<MicNoneTwoToneIcon sx={{ fontSize: 60}}/>}
          </IconButton>
        </div>
      </div>
      {/* <Box sx={{ '& button': { m: 1 }, 'display': 'flex', 'flexDirection': 'column'}}>
        <Button variant="contained" onClick={startRecording}>Recording Start 1</Button>
        <Button variant="contained" onClick={stopRecording}>Recording Stop 2</Button>
        <Button variant="contained" onClick={pauseRecording}>Recording Pause 3</Button>
        <Button variant="contained" onClick={resumeRecording}>Recording Resume</Button>
        <Button variant="outlined" onClick={playRecording}>Playing</Button>
        <Button variant="outlined" onClick={getStatus}>GetStatus</Button>
      </Box> */}

    </div>
  )
}

export default Home
