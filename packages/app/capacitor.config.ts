import { CapacitorConfig } from '@capacitor/cli';

const stage = process.env.STAGE

let url= 'http://0.0.0.0:3000'
switch(stage){
  case 'dev':
    url = 'http://192.168.0.4:3000/simple-voice-recorder'
    break
  case 'prod':
    url = 'https://realopeningan.github.io/simple-voice-recorder'
    break
  default:
    console.log("process.env.STAGE", process.env.STAGE)
    console.log("process.env", process.env)
    throw new Error('Stage must be one of dev, prod')
}


const config: CapacitorConfig = {
  appId: 'simplevoicerecorder.realopeningan.github.io',
  appName: 'simple-voice-recorder',
  webDir: '../web/out',
  bundledWebRuntime: false,
	server: {
		url,
    cleartext: true
	}
};

export default config;
