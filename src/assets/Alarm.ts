export class Alarm {
  interval: number;
  scheduledToEnd: number[] | undefined;
  date: Date;
  audio: HTMLAudioElement;

  constructor(interval: number, scheduledTime: string | undefined) {
    this.interval = interval;
    if (scheduledTime !== undefined) {
      this.scheduledToEnd = scheduledTime.split(":").map(Number);
    }
    this.date = new Date();
    this.audio = new Audio("./alarm.mp3");
  }
}
