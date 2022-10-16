import {
  Alarm,
  changeAlarmSetting,
  changeStandbyAlarm,
  changeAlarmNotification,
} from "./assets/Alarm";

const container = document.querySelector<HTMLDivElement>("#container");
let alarm: Alarm | null = null;

if (container) {
  changeAlarmSetting(container, alarm!);
}
