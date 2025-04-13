export type ShiftBlockType = {
  name: string;
  selectedDevice: string;
  startTime: Date;
  endTime: Date;
  color: string;
  id: string;
  userId: string;
  isOverlapShiftId: string[]; // 重複しているShiftBlockのID. 重複していない場合は[]
  // defaultDevice: string; // ユーザーが設定したデフォルトのデバイス名
  // project: string;
};
