import { audioFile } from "./alarm.mp3";
export {
  Alarm,
  changeAlarmSetting,
  changeStandbyAlarm,
  changeAlarmNotification,
};

class Alarm {
  interval: number;
  endAt: number[] | undefined;
  nextTime: number[];
  timerId: NodeJS.Timer | undefined;
  date: Date;
  audio: HTMLAudioElement;

  constructor() {
    this.interval = 0;
    this.endAt = undefined;
    this.nextTime = [0];
    this.timerId = undefined;
    this.date = new Date();
    this.audio = audioFile;
  }

  calculateNextTime() {}

  setAlarm() {}
}
const changeAlarmSetting = () => {};
const changeStandbyAlarm = () => {};
const changeAlarmNotification = () => {};
