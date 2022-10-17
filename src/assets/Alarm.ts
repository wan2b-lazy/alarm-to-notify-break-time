import audioFile from "./audioFile";
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

  calculateNextTime() {
    this.nextTime[0] = this.date.getHours() + Math.floor(this.interval / 60);
    this.nextTime[1] = this.date.getMinutes() + (this.interval % 60);

    if (this.nextTime[1] >= 60) {
      const convertedMinutes = Math.floor(this.nextTime[1] / 60);
      this.nextTime[1] - convertedMinutes * 60;
      this.nextTime[0] + convertedMinutes;
    }

    if (this.nextTime[1] >= 24) {
      this.nextTime[1] - 24;
    }
  }

  setAlarm() {
    this.calculateNextTime();
    this.timerId = setTimeout(() => {
      this.audio.play();
      clearTimeout(this.timerId);
      changePageOther(alarmNotification);
    }, this.interval * 60 * 1000);
    /*
    this.calculateNextTime();
    this.timerId = setInterval(() => {
      const currentHours = this.date.getHours();
      const currentMinutes = this.date.getMinutes();
      console.log(currentHours, currentMinutes, this.date.getSeconds());
      if (this.nextTime[0] < currentHours) {
        currentHours - 24;
      }

      if (
        currentHours >= this.nextTime[0] &&
        currentMinutes >= this.nextTime[1]
      ) {
        instanceOfAlarm?.audio.play();
        changePageOther(alarmNotification);
        clearInterval(this.timerId);
      }
    }, 1000);
    */
  }
}

const changePageOther = (pageText: PageText) => {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.insertAdjacentHTML("afterbegin", pageText.text);
  }

  switch (pageText.name) {
    case "settingAlarm":
      const startActivities = document.querySelector("#startActivities");
      if (startActivities != undefined) {
        startActivities.addEventListener("click", onStartActivitiesClicked);
      }
    case "standbyAlarm":
      const nextTime = document.querySelector("#nextTime");
      if (nextTime != undefined) {
        nextTime.textContent = `${instanceOfAlarm?.nextTime[0]}時 ${instanceOfAlarm?.nextTime[1]}分`;
      }
      const interruptionAlarmInStandbyAlarm =
        document.querySelector("#interruptionAlarm");
      if (interruptionAlarmInStandbyAlarm != undefined) {
        interruptionAlarmInStandbyAlarm.addEventListener(
          "click",
          onInterruptionAlarmClicked
        );
      }
    case "alarmNotification":
      const startStretch = document.querySelector("#startStretch");
      const restartAlarm = document.querySelector("#restartAlarm");
      const interruptionAlarmInAlarmNotification =
        document.querySelector("#interruptionAlarm");
      if (
        startStretch &&
        restartAlarm &&
        interruptionAlarmInAlarmNotification
      ) {
        startStretch.addEventListener("click", onStartStretchClicked);
        restartAlarm.addEventListener("click", onRestartAlarmClicked);
        interruptionAlarmInAlarmNotification.addEventListener(
          "click",
          onInterruptionAlarmClicked
        );
      }
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
