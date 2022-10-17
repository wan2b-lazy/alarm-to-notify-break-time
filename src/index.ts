import {
  Alarm,
  onStartActivitiesClicked,
  onInterruptionAlarmClicked,
  changePageOther,
  settingAlarm,
  standbyAlarm,
  alarmNotification,
} from "./assets/Alarm";
import "./assets/Alarm";
import "./assets/alarm.mp3";

const container = document.querySelector<HTMLDivElement>("#container");
let instanceOfAlarm: Alarm | undefined = undefined;

changePageOther(settingAlarm);
