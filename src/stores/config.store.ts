import { Dispatch } from 'react';
import { create } from 'zustand';
import { TRAIN_TYPE } from '~common/enums';

type ConfigStore = {
  trainType: TRAIN_TYPE;
  setTrainType: Dispatch<TRAIN_TYPE>;
};

export const useConfigStore = create<ConfigStore>((set) => ({
  trainType: TRAIN_TYPE.SCRATCH,
  setTrainType: (trainType: TRAIN_TYPE) => set(() => ({ trainType: trainType }))
}));
