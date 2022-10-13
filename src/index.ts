import audio from "./assets/alarm.mp3";
import { Alarm } from "./assets/Alarm";

let alarm: Alarm;

function changeAlarmSetting(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  element.insertAdjacentHTML(
    "afterbegin",
    `<h1>アラーム設定</h1><p><label for="interval">間隔（分）</label><input type="number" id="interval" required><p><label for="scheduledToEnd">終了予定</label><input type="time" id="scheduledToEnd"></p><button id="startOfActivities">活動開始</button>`
  );

  const startButton = document.querySelector<HTMLElement>("#startOfActivities");
  startButton!.addEventListener("click", () => {
    const intervalInput = document.querySelector<HTMLInputElement>("#interval");
    const scheduledToEndInput =
      document.querySelector<HTMLInputElement>("#scheduledToEnd");

    if (intervalInput && scheduledToEndInput) {
      alarm = new Alarm(Number(intervalInput.value), scheduledToEndInput.value);
    }
  });
}

function changeStandbyForAlarm(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  element.insertAdjacentHTML(
    "afterbegin",
    `<p>次回のアラームは<div></div><button>アラーム中断</button>`
  );
}

function changeAlarmNotification(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  element.insertAdjacentHTML(
    "afterbegin",
    `<h1>ストレッチの時間です</h1><button>ストレッチ開始</button> <button>ストレッチ完了</button> <button>中断</button>`
  );
}
