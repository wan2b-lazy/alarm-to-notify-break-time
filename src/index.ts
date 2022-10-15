import alarmFile from "./assets/alarm.mp3";
import { Alarm } from "./assets/Alarm";

declare let alarm: Alarm;
const divElem = document.querySelector<HTMLDivElement>("#alarm-content");
if (divElem != null) {
  changeSettingAlarm(divElem);
}

function changeSettingAlarm(elem: HTMLDivElement) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
  elem.insertAdjacentHTML(
    "afterbegin",
    "<button id='startOfActivities'>活動開始</button>"
  );

  // 「ページ内のinput要素を読みとって、その内容から新しいAlarmクラスを作成し、そのあと最初のアラームをセットする」関数をページ内の「活動開始」ボタンに紐づける
  const startButton = document.querySelector("#startOfActivities");
  if (startButton != null) {
    startButton.addEventListener("click", () => {
      const intervalInput =
        document.querySelector<HTMLInputElement>("#interval");
      const scheduledToEndInput =
        document.querySelector<HTMLInputElement>("#scheduledToEnd");

      if (intervalInput && scheduledToEndInput) {
        alarm = new Alarm(
          Number(intervalInput.value),
          scheduledToEndInput.value
        );
        alarm.setAlarm();
      }
    });
  }
  return;
}

export const changeStandbyForAlarm = (elem: HTMLElement) => {
  console.log("changeStandbyForAlarm");
};

export const changeNotifyAlarm = (elem: HTMLDivElement) => {
  console.log("changeAlarmNotification");
};
