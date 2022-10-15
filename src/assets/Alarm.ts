import alarmFile from "./alarm.mp3";

export class Alarm {
  interval: number;
  scheduledToEnd: number[] | undefined;
  nextTime: number[];
  date: Date;
  audio: HTMLAudioElement;
  timerId: number;

  constructor(intervalInput: number, scheduledToEndInput: string | undefined) {
    this.interval = intervalInput;
    if (scheduledToEndInput != undefined) {
      this.scheduledToEnd = scheduledToEndInput.split(":").map(Number);
    }
    this.nextTime = [0, 0];
    this.date = new Date();
    this.audio = new Audio(alarmFile);
    this.timerId = 0;
  }

  calculateNextTime() {
    this.nextTime[0] = this.date.getHours() + Math.floor(this.interval / 60);
    this.nextTime[1] = this.date.getMinutes() + (this.interval % 60);

    if (this.nextTime[1] >= 60) {
      const convertedMinute: number = Math.floor(this.nextTime[1] / 60);
      this.nextTime[1] - convertedMinute * 60;
      this.nextTime[0] + convertedMinute;
    }

    if (this.nextTime[0] >= 24) {
      this.nextTime[0] - 24;
    }
  }

  setAlarm() {}
}
