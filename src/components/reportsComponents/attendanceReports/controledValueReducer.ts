export enum ActionTypes {
  handleChange,
  initUpdateState,
}

export type IAttendanceObj = {
  id: number;
  value: number;
};

export type IAction =
  | { type: ActionTypes.initUpdateState; payload: IAttendanceObj[] }
  | { type: ActionTypes.handleChange; payload: IAttendanceObj };

export const controledValueReducer = (state: IAttendanceObj[], action: IAction) => {
  switch (action.type) {
    case ActionTypes.initUpdateState:
      return action.payload;
    case ActionTypes.handleChange:
      return state.map((v) =>
        v.id === action.payload.id && (v.value === 0 || v.value !== action.payload.value)
          ? { id: v.id, value: action.payload.value }
          : v
      );
    default:
      return state;
  }
};
