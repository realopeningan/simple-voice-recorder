import {
  VoiceRecorder,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus
} from 'capacitor-voice-recorder';
import { useEffect, useState } from 'react';
import { css } from '@emotion/css'

import {
  createTheme,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
} from '@mui/material';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { Directory, Encoding, FileInfo, Filesystem, GetUriOptions } from '@capacitor/filesystem';

function Home() {
	const [base64Sound, setBase64Sound] = useState<undefined|string>(undefined)
  const [nowRecording, setNowRecording] = useState(false)
  const [recordingfiles, setRecordingFiles] = useState<FileInfo[]>([])

  const savedFolder = 'voiceR/'
  const savedDirType = Directory.Data

  useEffect(()=>{
    try{
      readDir()
      VoiceRecorder.canDeviceVoiceRecord().then(
        (result: GenericResponse) => console.log(result.value)
      )

      VoiceRecorder.requestAudioRecordingPermission().then(
        (result: GenericResponse) => console.log(result.value)
      )

      VoiceRecorder.hasAudioRecordingPermission().then(
        (result: GenericResponse) => console.log(result.value)
      )

      Filesystem.requestPermissions().then(
        (result: any) => console.log(result)
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
    .then(async (result: RecordingData) => {
      console.log(result.value)
      setBase64Sound(result.value.recordDataBase64)
      const dateTime = new Date().getTime()
      console.log("dateTime", dateTime)
      await Filesystem.writeFile({
        path: savedFolder+dateTime+".bin",
        data: result.value.recordDataBase64,
        directory: savedDirType,
        encoding: Encoding.UTF8,
      });
      await readDir()
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

  const playRecording = (data: string) =>{
    const mimeType = 'audio/aac'  // from plugin
    const audioRef = new Audio(`data:${mimeType};base64,${data}`)
    console.log("base64Sound", data)
    audioRef.oncanplaythrough = () => audioRef.play()
    audioRef.load()
  }

  const div1Style=css`
    display: flex;
    flex-direction: column;
    height: 100vh
  `

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

  const checkFileExists = async (getUriOptions: GetUriOptions): Promise<boolean> => {
    try {
      await Filesystem.stat(getUriOptions);
      return true;
    } catch (err: any) {
      //if (err.message === 'File does not exist') {
        return false;
      //}
    }
  }

  const readDir = async () => {
    if(! await checkFileExists({
      path: savedFolder,
      directory: savedDirType,
    })){
      await Filesystem.mkdir({
        path: savedFolder,
        directory: savedDirType,
      });
    }

    const files = await Filesystem.readdir({
      path: savedFolder,
      directory: savedDirType,
    });

    console.log("files", JSON.stringify(files))

    setRecordingFiles(files.files)
  };


  const playFile = async (fileName:string) => {
    const contents = await Filesystem.readFile({
      path: savedFolder+fileName,
      directory: savedDirType,
      encoding: Encoding.UTF8
    });
    playRecording(contents.data)
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={div1Style}>
        <Topbar/>
        <div
          className={css`height:75%`}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: 'fixed'}}>
            {
              recordingfiles.map((file)=>{
                return(
                  <ListItem key={`${file.name}`} >
                    <ListItemText primary={`${file.name}`} secondary={`${file.ctime}`} onClick={()=>playFile(`${file.name}`)}/>
                  </ListItem>
                )
              })
            }
          </List>
        </div>
        <Footer recording={nowRecording} btnClick={btnClick}/>
      </div>
    </ThemeProvider>
  )
}

export default Home
