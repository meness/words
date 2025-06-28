import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { app } from '~configs/app.config';

export const WordsTableEmptyContent = () => (
  <div className="flex flex-col items-center gap-4">
    ببخشید! ما این کلمه را هنوز ثبت نکردیم. می‌خواهید پیشنهاد دهید که زودتر ثبت کنیم؟
    <Button
      as={Link}
      href={`mailto:${app.developerEmail}`}
      color="secondary"
      radius="lg"
      size="sm"
      variant="shadow">
      درخواست کلمات بیشتر
    </Button>
  </div>
);
