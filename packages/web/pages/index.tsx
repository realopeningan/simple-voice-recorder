import {
  VoiceRecorder,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus
} from 'capacitor-voice-recorder';
import { useEffect, useState } from 'react';
import { css } from '@emotion/css'

import {
  AppBar,
  Box,
  createTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  ThemeProvider,
} from '@mui/material';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { Directory, Encoding, FileInfo, Filesystem, GetUriOptions } from '@capacitor/filesystem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
//import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import SwipeableViews from 'react-swipeable-views';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index?: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Home() {
	const [base64Sound, setBase64Sound] = useState<undefined|string>(undefined)
  const [nowRecording, setNowRecording] = useState(false)
  const [recordingfiles, setRecordingFiles] = useState<FileInfo[]>([])
  const [firstLoad, setFirstLoad] = useState(true)

  const [nav, setNav] = useState("1")

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const savedFolder = 'voiceR/files/'
  const savedDirType = Directory.Data

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

  useEffect(()=>{
    if(firstLoad === true){
      setFirstLoad(false)
      console.log("### call readDir")
      readDir()
    }
  }, [firstLoad])

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
      const date = new Date()
      let dateTime = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}.${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      dateTime = dateTime.substring(2)
      console.log("dateTime", dateTime)
      const res = await Filesystem.writeFile({
        path: savedFolder+dateTime,
        data: result.value.recordDataBase64,
        directory: savedDirType,
        encoding: Encoding.UTF8,
      });
      console.log("res", res)
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
        main: '#bcbcbc',
        light: '#eeeeee',
        dark: '#8c8c8c'
      },
      secondary: {
        main: '#ffeb3b',
        light: '#ffff72',
        dark: '#c8b900'
      },
      success:{
        main: '#69f0ae',
        light: '#9fffe0',
        dark: '#2bbd7e'
      }
    }
  });

  const checkDirectoryExists = async (getUriOptions: GetUriOptions): Promise<boolean> => {
    try {
      console.log("### aaa")
      await Filesystem.readdir(getUriOptions);
      console.log("### bbb")
      return true;
    } catch (err: any) {
        console.log("### ccc")
        return false;//exist
    }
  }

  const readDir = async () => {
    const exist = await checkDirectoryExists({
      path: savedFolder,
      directory: savedDirType,
    })
    if(! exist){
      try{
        await Filesystem.mkdir({
          path: savedFolder,
          directory: savedDirType,
          recursive: true
        });
      }catch(e){
        console.log(e)
      }
    }

    let files = await Filesystem.readdir({
      path: savedFolder,
      directory: savedDirType,
    });

    files.files.sort((function(a, b){
      return String(b.ctime).localeCompare(String(a.ctime))
    }))

    console.log("files", JSON.stringify(files))

    setRecordingFiles(files.files)
  };

  const dateToString = (date:number|undefined) =>{
    if(date===undefined)
      return ""
    return new Date(Number(date)).toDateString()
  }


  const playFile = async (fileName:string) => {
    const contents = await Filesystem.readFile({
      path: savedFolder+fileName,
      directory: savedDirType,
      encoding: Encoding.UTF8
    });
    playRecording(contents.data)
  };

  const [bodyHeight, setBodyHeight] = useState('70%')

  const onFooterClick = (click:boolean) =>{
    console.log(`footerClick : ${click}`)
    if(click===true){
      setBodyHeight('56%')
    }else{
      setBodyHeight('71%')
    }
  }

  const listProps = {
    paddingTop: 0,
    paddingBottom: '20%'
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={div1Style}>
        <Topbar/>
        <List sx={listProps} >
          {
            recordingfiles.map((file)=>{
              return(
                <>
                  <ListItem key={`${file.ctime}`}
                            sx={{backgroundColor: theme.palette.primary.light}}
                            onClick={()=>playFile(`${file.name}`)}>
                    <ListItemText primary={`${file.name}`} secondary={`${dateToString(file.ctime)}`}/>
                  </ListItem>
                  <Divider/>
                </>
              )
            })
          }
        </List>
        <Footer recording={nowRecording} btnClick={btnClick} footerClick={onFooterClick}/>
      </div>
    </ThemeProvider>
  )
}

export default Home
