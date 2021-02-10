export enum ActionTypes {
  initUpdateState,
  selectElement,
  selectAllElements,
  deselectAllElements,
  clearData,
}

export type objInfo = {
  id: number;
  typename: 'Constituency' | 'User' | 'PreActivatedUser';
  selected: boolean;
};

export type IAction =
  | { type: ActionTypes.selectElement; payload: objInfo }
  | { type: ActionTypes.initUpdateState; payload: objInfo[] }
  | { type: ActionTypes.selectAllElements | ActionTypes.deselectAllElements }
  | { type: ActionTypes.clearData };

export const adminListReducer = (state: objInfo[], action: IAction) => {
  switch (action.type) {
    case ActionTypes.initUpdateState:
      return action.payload;
    case ActionTypes.selectElement:
      return state.map((value) => {
        if (value.id === action.payload.id && value.typename === action.payload.typename) {
          value.selected = !value.selected;
        }

        return value;
      });
    case ActionTypes.selectAllElements:
      return state.map((value) => {
        return { ...value, selected: true };
      });
    case ActionTypes.deselectAllElements:
      return state.map((value) => {
        return { ...value, selected: false };
      });
    default:
      return state;
  }
};

//typename?: 'Constituency', typename?: 'User', typename?: 'PreActivatedUser'
