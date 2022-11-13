import useRecorder from '../hooks/use-recorder';
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
import { css } from '@emotion/react'

function Home() {
  const { recorderState, ...handlers } = useRecorder()
	const [base64Sound, setBase64Sound] = useState<undefined|string>(undefined)


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

  const startRecording = () =>{
    VoiceRecorder.startRecording()
    .then((result: GenericResponse) => console.log(result.value))
    .catch(error => console.log(error))
  }

  const stopRecording = () =>{
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

  return (
    <div>
      <h1 className='title'>Voice Recorder</h1>
      <Box sx={{ '& button': { m: 1 }, 'display': 'flex', 'flexDirection': 'column'}}>
        <Button variant="contained" onClick={startRecording}>Recording Start</Button>
        <Button variant="contained" onClick={stopRecording}>Recording Stop</Button>
        <Button variant="contained" onClick={pauseRecording}>Recording Pause</Button>
        <Button variant="contained" onClick={resumeRecording}>Recording Resume</Button>
        <Button variant="outlined" onClick={playRecording}>Playing</Button>
        <Button variant="outlined" onClick={getStatus}>GetStatus</Button>
      </Box>
    </div>
  )
}

export default Home
