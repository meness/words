import { EXAM_TYPE } from '~common/enums';

export const examOptions: Record<EXAM_TYPE, { description: string; label: string }> = {
  meaning: { label: 'معنی کلمات', description: 'معنی کلمات را آزمون بدهید.' },
  description: {
    label: 'توضیح کلمات',
    description: 'توضیح کلمات را آزمون بدهید.'
  }
};
