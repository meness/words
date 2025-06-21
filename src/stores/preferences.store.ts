import { Dispatch } from 'react';
import { create } from 'zustand';
import { TRAIN_TYPE } from '~common/enums/train-type.enum';

type Preferences = {
  trainType: TRAIN_TYPE;
  setTrainType: Dispatch<Preferences['trainType']>;
};

export const usePreferences = create<Preferences>((set) => ({
  trainType: TRAIN_TYPE.SCRATCH,
  setTrainType: (trainType: TRAIN_TYPE) => set(() => ({ trainType: trainType }))
}));
