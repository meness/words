import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';
import { route } from '~common/consts/route.const';
import { app } from '~configs/app.config';

const WordNotFound = () => (
  <div className="flex min-h-full w-full items-center justify-center select-none">
    <Card
      shadow="md"
      radius="lg"
      fullWidth
      className="max-w-md">
      <CardHeader
        as="h1"
        className="justify-center text-center text-4xl">
        🤨
      </CardHeader>
      <CardBody className="text-center text-lg">
        ببخشید! ما این کلمه را هنوز ثبت نکردیم. می‌خواهید پیشنهاد دهید که زودتر ثبت کنیم؟
      </CardBody>
      <CardFooter className="flex-col gap-2">
        <Button
          as={Link}
          href={`mailto:${app.developerEmail}`}
          color="default"
          fullWidth
          size="md">
          درخواست کلمات بیشتر
        </Button>
        <Button
          as={Link}
          href={route.home}
          fullWidth
          color="primary"
          variant="shadow">
          کلمات دیگر را تمرین کنید
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default WordNotFound;
