export class Alarm {
  interval: number;
  scheduledToEnd: number[] | undefined;
  date: Date;
  audio: HTMLAudioElement;

  constructor(minute: number, scheduledTime: string) {
    this.interval = minute;
    if (scheduledTime !== undefined) {
      this.scheduledToEnd = scheduledTime.split(":").map(Number);
    }
    this.date = new Date();
    this.audio = new Audio("../../dist/alarm.mp3");
  }
}
