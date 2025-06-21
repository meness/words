import { TRAIN_TYPE } from '~common/enums/train-type.enum';

export const trainOption: Record<TRAIN_TYPE, { description: string; label: string }> = {
  scratch: { label: 'همه کلمات', description: 'همه کلمات را تمرین کن.' },
  trained: {
    label: 'کلمات تمرین‌شده',
    description: 'کلماتی که قبلا تمرین‌شده را تمرین کن.'
  },
  rest: { label: 'کلمات باقی‌مانده', description: 'کلمات باقی‌مانده را تمرین کن.' }
};
