import { audioFile } from "./alarm.mp3";
export {
  settingAlarm,
  standbyAlarm,
  alarmNotification,
  Alarm,
  changePageOther,
  onStartActivitiesClicked,
  onInterruptionAlarmClicked,
  onStartStretchClicked,
  onRestartAlarmClicked,
};

let instanceOfAlarm: Alarm | undefined = undefined;
const container = document.querySelector("#container");
interface PageText {
  name: string;
  text: string;
}
const settingAlarm: PageText = {
  name: "settingAlarm",
  text: `<h1>アラーム設定</h1><p><label for="interval">間隔（分）</label><input type="number" id="interval"><p><label for="endAt">終了予定</label><input type="time" id="endAt"></p><button id="startActivities">活動開始</button>`,
};
const standbyAlarm: PageText = {
  name: "standbyAlarm",
  text: `<p>次のアラームは<p id="nextTime"></p><button id="interruptionAlarm">アラーム中断</button>`,
};
const alarmNotification: PageText = {
  name: "alarmNotification",
  text: `<p>ストレッチの時間です</p><button id="startStretch">ストレッチ開始</button> <button id="restartAlarm" disabled>ストレッチ完了</button> <button id="interruptionAlarm">アラーム中断</button>`,
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

const changePageOther = (pageText: PageText) => {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.insertAdjacentHTML("afterbegin", pageText.text);
  }
};

const onStartActivitiesClicked = (): void => {
  const interval = document.querySelector<HTMLInputElement>("#interval");
  const endAt = document.querySelector<HTMLInputElement>("#endAt");
  if (interval && endAt) {
    instanceOfAlarm = new Alarm(interval.value, endAt.value);
    instanceOfAlarm.setAlarm();
    changePageOther(standbyAlarm);
    return;
  }
  return;
};
const onInterruptionAlarmClicked = (): void => {
  if (instanceOfAlarm != undefined) {
    clearInterval(instanceOfAlarm.timerId);
    changePageOther(settingAlarm);
  }
};
const onStartStretchClicked = (): void => {
  if (instanceOfAlarm != undefined) {
    instanceOfAlarm.audio.pause();
    instanceOfAlarm.audio.currentTime = 0;
    const restartAlarm =
      document.querySelector<HTMLButtonElement>("#restartAlarm");
    if (restartAlarm) {
      restartAlarm.disabled = false;
    }
  }
};
const onRestartAlarmClicked = (): void => {
  if (instanceOfAlarm != undefined) {
    instanceOfAlarm.setAlarm();
    changePageOther(standbyAlarm);
  }
};
