import alarmFile from "./alarm.mp3";

export class Alarm {
  interval: number;
  scheduledToEnd: number[] | undefined;
  date: Date;
  audio: HTMLAudioElement;

  constructor(intervalInput: number, scheduledToEndInput: string) {
    this.interval = intervalInput;
    if (scheduledToEndInput != undefined) {
      this.scheduledToEnd = scheduledToEndInput.split(":").map(Number);
    }
    this.date = new Date();
    this.audio = new Audio(alarmFile);
  }
}

export const changeSettingAlarm = (elem: HTMLElement) => {
  return new Alarm(1, "仮置き");
};

export const changeStandbyForAlarm = (elem: HTMLElement) => {
  console.log("changeStandbyForAlarm");
};

export const changeAlarmNotification = (elem: HTMLElement) => {
  console.log("changeAlarmNotification");
};
