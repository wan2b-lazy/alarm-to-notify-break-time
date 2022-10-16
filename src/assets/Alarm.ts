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

  constructor(interval: string, endAt: string | undefined) {
    this.interval = Number(interval);
    this.endAt = endAt === undefined ? undefined : endAt.split(":").map(Number);
    this.nextTime = [0];
    this.timerId = undefined;
    this.date = new Date();
    this.audio = new Audio(audioFile);
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
        instanceVar = new Alarm(interval.value, endAt.value);
        instanceVar.setAlarm();
        changeStandbyAlarm(container, instanceVar);
      }
    });
  }
};
const changeStandbyAlarm = (container: HTMLDivElement, instanceVar: Alarm) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.insertAdjacentHTML(
    "afterbegin",
    `<p>次のアラームは<p>${instanceVar.nextTime[0]}時 ${instanceVar.nextTime[1]}分</p><button id="interruptionAlarm">アラーム中断</button>`
  );

  const interruptionAlarm = document.querySelector("#interruptionAlarm");
  if (interruptionAlarm) {
    interruptionAlarm.addEventListener("click", () => {
      clearInterval(instanceVar.timerId);
      changeAlarmSetting(container, instanceVar);
    });
  }
};
const changeAlarmNotification = () => {};
