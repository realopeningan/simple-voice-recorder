import { SetRecordings } from "../type/recorder";

export function deleteAudio(audioKey: string, setRecordings: SetRecordings) {
  setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
}