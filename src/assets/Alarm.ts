import alarmFile from "./alarm.mp3";

export class Alarm {
  interval: number;
  scheduledToEnd: number[] | undefined;
  date: Date;
  audio: HTMLAudioElement;

  constructor(intervalInput: number, scheduledToEndInput: string | undefined) {
    this.interval = intervalInput;
    if (scheduledToEndInput != null) {
      this.scheduledToEnd = scheduledToEndInput.split(":").map(Number);
    }
    this.date = new Date();
    this.audio = new Audio(alarmFile);
  }

  setAlarm() {
    console.log("setAlarm");
  }
}
