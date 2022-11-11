import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useReactMediaRecorder } from "react-media-recorder";
import { ReactMediaRecorder } from "react-media-recorder";
import dynamic from 'next/dynamic';
import useRecorder from '../hooks/use-recorder';
import RecorderControls from '../component/recorder-controls'
import RecordingsList from '../component/recordings-list';

function Home() {
  const { recorderState, ...handlers } = useRecorder()
  const {audio} = recorderState

  return (
    <section>
      <h1 className='title'>Voice Recorder</h1>
      <div className='recorder-container'>
        <RecorderControls recorderState={recorderState} handlers={handlers}/>
        <RecordingsList audio={audio}/>
      </div>
    </section>
  )
}

export default Home
