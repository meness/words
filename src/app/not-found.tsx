import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';
import * as motion from 'motion/react-client';
import { route } from '~common/consts/route.const';

const NotFound = () => (
  <motion.div
    transition={{ duration: 0.5 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex h-svh w-svw place-content-center place-items-center">
    <Card
      classNames={{
        footer: 'justify-center',
        base: 'gap-10 w-full max-w-5xl',
        body: 'text-center',
        header: 'text-3xl flex justify-center font-bold'
      }}>
      <CardHeader>Page Not Found</CardHeader>
      <CardBody>Sorry, this page leads you no where!</CardBody>
      <CardFooter>
        <Button
          as={Link}
          size="lg"
          href={route.home}
          color="primary"
          className="w-full max-w-xs"
          variant="shadow">
          Back Home
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

export default NotFound;
