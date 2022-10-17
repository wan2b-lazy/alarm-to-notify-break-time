import {
  Alarm,
  onStartActivitiesClicked,
  onInterruptionAlarmClicked,
  changePageOther,
  settingAlarm,
  standbyAlarm,
  alarmNotification,
} from "./assets/Alarm";

const container = document.querySelector<HTMLDivElement>("#container");
let instanceOfAlarm: Alarm | undefined = undefined;
