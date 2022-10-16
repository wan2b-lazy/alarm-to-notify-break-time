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

  constructor(interval: number, endAt: string) {
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
const changeAlarmSetting = (container: HTMLDivElement, instanceVar: Alarm) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.insertAdjacentHTML(
    "afterbegin",
    `<h1>アラーム設定</h1><p><label for="interval">間隔（分）</label><input type="number" id="interval"><p><label for="endAt">終了予定</label><input type="time" id="endAt"></p><button id="startActivities">活動開始</button>`
  );

  const startActivities = document.querySelector("#startActivities");
  if (startActivities) {
    startActivities.addEventListener("click", () => {
      const interval = document.querySelector<HTMLInputElement>("#interval");
      const endAt = document.querySelector<HTMLInputElement>("#endAt");

      if (interval != null && endAt != null) {
        instanceVar = new Alarm(Number(interval.value), endAt.value);
        instanceVar.setAlarm();
      }
    });
  }
};
const changeStandbyAlarm = () => {};
const changeAlarmNotification = () => {};
