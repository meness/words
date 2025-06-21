'use client';

import './globals.css';

import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import { motion } from 'motion/react';
import { DispatchWithoutAction } from 'react';
import { twJoin } from 'tailwind-merge';
import { route } from '~common/consts/route.const';
import { ui } from '~configs/ui.config';

export type ErrorBoundaryProps = { error: Error & { digest?: string }; reset: DispatchWithoutAction };

const GlobalError = ({ reset }: ErrorBoundaryProps) => (
  <>
    <html
      suppressHydrationWarning
      dir="ltr"
      lang="en"
      className={twJoin(ui.fonts.yekanBakh.variable)}>
      <body>
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex h-svh w-svw place-content-center place-items-center">
          <Card
            classNames={{
              footer: 'justify-center gap-4',
              base: 'gap-10 max-w-5xl bg-foreground-500',
              body: 'text-center flex flex-col gap-3',
              header: 'text-3xl flex justify-center font-bold'
            }}>
            <CardHeader>Something Happened</CardHeader>
            <CardBody>
              <p>Sorry, something weird happened.</p>
              <div className="text-sm">
                This page shows to you only if you run the app using{' '}
                <Snippet
                  hideCopyButton
                  size="sm"
                  hideSymbol>
                  bun dev
                </Snippet>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                fullWidth
                size="lg"
                variant="shadow"
                onPress={reset}>
                Try Again
              </Button>
              <Button
                as={Link}
                size="lg"
                href={route.home}
                color="default"
                fullWidth
                variant="ghost">
                Back Home
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </body>
    </html>
  </>
);

export default GlobalError;
