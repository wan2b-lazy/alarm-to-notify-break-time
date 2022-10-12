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

  changeAlarmSetting(element: HTMLDivElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    element.insertAdjacentHTML(
      "afterbegin",
      `<h1>アラーム設定</h1><p><label for="interval">間隔（分）</label><input type="number" id="interval"><p><label for="scheduledToEnd">終了予定</label><input type="time" id="scheduledToEnd"></p><button id="startOfActivities">活動開始</button>`
    );
  }

  changeStandbyForAlarm(element: HTMLDivElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    element.insertAdjacentHTML(
      "afterbegin",
      `<p>次回のアラームは<div></div><button>アラーム中断</button>`
    );
  }

  changeAlarmNotification(element: HTMLDivElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    element.insertAdjacentHTML(
      "afterbegin",
      `<h1>ストレッチの時間です</h1><button>ストレッチ開始</button> <button>ストレッチ完了</button> <button>中断</button>`
    );
  }
}
