import { TRAIN } from '~common/enums';

export const trainOptions: Record<TRAIN, { description: string; label: string; key: TRAIN }> = {
  scratch: { label: 'همه کلمات', description: 'همه کلمات را تمرین کن.', key: TRAIN.SCRATCH },
  learned: {
    label: 'کلمات تمرین‌شده',
    description: 'کلماتی که قبلا تمرین‌شده را تمرین کن.',
    key: TRAIN.LEARNED
  },
  left: { label: 'کلمات باقی‌مانده', description: 'کلمات باقی‌مانده را تمرین کن.', key: TRAIN.LEFT }
};
