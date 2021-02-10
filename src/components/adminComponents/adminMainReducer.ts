export enum ActionTypes {
  getOperators,
}

export const adminMainReducer = (state: boolean[], action: { type: ActionTypes; payload: number }) => {
  switch (action.type) {
    case ActionTypes.getOperators:
      return state.map((value, index) => (action.payload === index ? !value : value));
    default:
      return state;
  }
};
