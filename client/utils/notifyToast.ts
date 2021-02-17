import { notify } from "react-notify-toast";

export const showNotify = (
  type: any,
  message: string,
  //pos?: string,
  time?: number,
  color?: any
) => {
  notify.show(
    message !== "" ? message : "Success!",
    type,
    time ? time : 5000,
    color && color
  );
};
