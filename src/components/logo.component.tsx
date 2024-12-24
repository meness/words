import { Image, ImageProps } from '@nextui-org/image';

type LogoProps = ImageProps;

export const Logo = (props: LogoProps) => (
  <Image
    src="/favicon.svg"
    radius="none"
    alt="Logo"
    {...props}
  />
);
