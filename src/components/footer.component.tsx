import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Logo } from './logo.component';

export const Footer = () => (
  <Card
    shadow="none"
    as="footer"
    radius="none"
    classNames={{
      base: 'select-none bg-background text-xs text-foreground',
      body: 'text-center flex flex-row gap-4 items-center justify-between'
    }}>
    <Divider />
    <CardBody>
      <Logo
        width={30}
        classNames={{ wrapper: 'opacity-20' }}
      />
      <span>توسعه‌یافته با ❤️ در تهران</span>
    </CardBody>
  </Card>
);
