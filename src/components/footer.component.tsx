import { Card, CardBody } from '@nextui-org/card';
import { Logo } from './logo.component';

export const Footer = () => (
  <Card
    shadow="none"
    as="footer"
    radius="none"
    classNames={{
      base: 'select-none bg-gray-100 text-xs text-gray-500',
      body: 'text-center flex flex-row gap-4 items-center justify-between'
    }}>
    <CardBody>
      <Logo
        width={30}
        classNames={{ wrapper: 'opacity-20' }}
      />
      <span>توسعه‌یافته با ❤️ در تهران</span>
    </CardBody>
  </Card>
);
