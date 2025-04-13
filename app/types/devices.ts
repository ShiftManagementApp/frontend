export enum Devices {
  WHITE_PC = "WHITE_PC",
  BLACK_PC = "BLACK_PC",
  LAPTOP = "LAPTOP",
  MAC1 = "MAC1",
  MAC2 = "MAC2",
}

export const deviceLabelMap: Record<Devices, string> = {
  [Devices.WHITE_PC]: "白PC",
  [Devices.BLACK_PC]: "黒PC",
  [Devices.LAPTOP]: "ノートPC",
  [Devices.MAC1]: "Mac1",
  [Devices.MAC2]: "Mac2",
};
