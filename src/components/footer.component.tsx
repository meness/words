import { Card, CardBody } from '@nextui-org/card';

export const Footer = () => (
  <Card
    shadow="none"
    as="footer"
    radius="none"
    classNames={{
      base: 'select-none bg-gray-100 text-xs text-gray-500',
      body: 'text-center flex gap-4 md:gap-0 md:flex-row'
    }}>
    <CardBody>
      <span className="grow">
        این ابزار با قابلیت‌های کافی رایگان در اختیار شماست تا کلمات انگلیسی حقوقی را تمرین کنید.
      </span>
      <span>توسعه‌یافته با ❤️ در تهران</span>
    </CardBody>
  </Card>
);
