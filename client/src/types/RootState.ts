export interface RootState {
  username: string;
  hostname: string;
  displayHost: boolean;
}

interface AUsername {
  type: 'setusername';
  payload: string;
}

interface AHostname {
  type: 'sethostname';
  payload: string;
}

interface ADisplayHost {
  type: 'setdisplayhost';
  payload: boolean;
}

interface AMultiple {
  type: 'setmultiple';
  payload: any;
}

export type Action = AUsername | AHostname | ADisplayHost | AMultiple;
