import { EXAM_TYPE } from '~common/enums/exam-type.enum';

export const examOption: Record<EXAM_TYPE, { description: string; label: string }> = {
  meaning: { label: 'معنی کلمات', description: 'معنی کلمات را آزمون بدهید.' },
  description: {
    label: 'توضیح کلمات',
    description: 'توضیح کلمات را آزمون بدهید.'
  }
};
