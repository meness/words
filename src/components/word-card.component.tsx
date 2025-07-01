import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { twJoin } from 'tailwind-merge';
import { Word } from '~common/types/word.type';
import { translateTags } from '~helpers/csv.helper';

type WordCardProps = { word: Word; isPrimary?: boolean };

type WordHeadingProps = WordCardProps;

const WordHeading = ({ isPrimary, word }: WordHeadingProps) => {
  const Heading = isPrimary ? 'h1' : 'h3';

  return (
    <Heading
      className="font-inter flex w-full flex-col text-start text-3xl font-extrabold"
      dir="ltr">
      {word.word}
      <span className="text-medium">{word.pronunciation}</span>
    </Heading>
  );
};

export const WordCard = ({ word, isPrimary }: WordCardProps) => (
  <Card
    as="article"
    shadow="md"
    radius="lg"
    fullWidth
    className="h-full max-w-2xl overflow-hidden">
    <CardHeader
      as="header"
      className={twJoin(
        'flex flex-col items-start bg-gradient-to-r p-6 text-white',
        isPrimary ? 'from-primary-500 to-primary-900' : 'from-gray-500 to-gray-700'
      )}>
      <WordHeading
        word={word}
        isPrimary={isPrimary}
      />
      <ul className="flex items-center gap-1">
        {translateTags(word.tags).map(({ label, color, tag }) => (
          <Chip
            key={tag}
            as="li"
            color="default"
            size="sm"
            className="text-white uppercase"
            style={{ backgroundColor: color }}
            variant="solid">
            {label}
          </Chip>
        ))}
      </ul>
      <p className="mt-1 text-lg">
        به معنی <strong className="font-bold">{word.meaning}</strong>
      </p>
      <p className="mt-1 text-sm text-gray-200">{word.description}</p>
    </CardHeader>
    <CardBody
      as="section"
      className="p-6">
      <dl className="flex flex-col gap-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <dt className="font-semibold">مثال</dt>
          <dd
            className="font-inter font-medium"
            dir="ltr">
            {word.example}
          </dd>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <dt className="font-semibold">ترجمه</dt>
          <dd className="font-medium">{word.translation}</dd>
        </div>
      </dl>
    </CardBody>
  </Card>
);
