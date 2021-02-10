import React, { useEffect } from 'react';
import { GetConstituencyQuery } from '../../../generated/graphql';

export default function ProtocolCreateInitState(
  data: GetConstituencyQuery | undefined,
  constituencyId: number | null,
  setProtocol: React.Dispatch<IAction>,
  setEmptyFields: React.Dispatch<React.SetStateAction<string[]>>
) {
  useEffect(() => {
    if (constituencyId) {
      if (data?.getConstituency && data.getConstituency.length > 0) {
        const constituency = data.getConstituency.find((c) => c.id === constituencyId);

        const infoPartObj = { constituencyID: constituencyId.toString(), adress: constituency?.adress || '-' };

        if (constituency) {
          if (constituency.finalReport) {
            const parsedString = JSON.parse(constituency.finalReport);
            const { c8, d1, creationTime, ...rest } = parsedString;
            const protocolObj = { ...rest, c8, d1, ...infoPartObj };

            setProtocol({
              type: ActionTypes.initUpdateState,
              payload: protocolObj,
            });

            const arrOfEmptyFields = Object.entries(rest)
              .map((value) => {
                if (!value[1]) {
                  return value[0];
                } else return '';
              })
              .filter((v) => v);

            setEmptyFields(arrOfEmptyFields);
          } else {
            const createNewProtocol = {
              a1: '',
              a2: '',
              a3: '',
              a4: '',
              a5: '',
              a6: '',
              a7: '',
              a7a: '',
              a7b: '',
              a7c: '',
              b1: '',
              b2: '',
              b3: '',
              b4: '',
              b5: '',
              c1: '',
              c2: '',
              c3: '',
              c4: '',
              c5: '',
              c6: '',
              c7: '',
            };

            const protocolObj = { ...infoPartObj, c8: '', d1: '', ...createNewProtocol };

            setProtocol({
              type: ActionTypes.initUpdateState,
              payload: protocolObj,
            });

            setEmptyFields(Object.keys(createNewProtocol));
          }
        }
      }
    }
  }, [constituencyId]);
}

export enum ActionTypes {
  handleChange,
  initUpdateState,
}

export type IProtocolObj = Record<string, string>;

export type IAction =
  | { type: ActionTypes.initUpdateState; payload: IProtocolObj }
  | { type: ActionTypes.handleChange; payload: { param: string; value: string } };

export const protocolValueReducer = (state: IProtocolObj, action: IAction) => {
  switch (action.type) {
    case ActionTypes.initUpdateState:
      return action.payload;
    case ActionTypes.handleChange:
      return { ...state, [action.payload.param]: action.payload.value };
    default:
      return state;
  }
};
