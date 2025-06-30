import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Link } from '@heroui/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { WebPage, WithContext } from 'schema-dts';
import { route } from '~common/consts/route.const';
import { PageParams } from '~common/types/page-params.type';
import { Word } from '~common/types/word.type';
import { app } from '~configs/app.config';
import { translateTags } from '~helpers/csv.helper';
import { combineCsvData } from '~helpers/database.helper';
import { CsvService } from '~services/csv.service';
import { getRandomWordsExcludingIndex } from '~utils/array.util';

const jsonLd = (word: Word): WithContext<WebPage> => {
  const title = `معنی و ترجمه کلمه ${word.word} به فارسی`;
  const description = `${word.word} به معنی ${word.meaning} است. ${word.description}`;
  const keywords = [
    `معنی ${word.word}`,
    `ترجمه ${word.word}`,
    `تلفظ ${word.word}`,
    `${word.word} meaning`,
    `${word.word} pronunciation`
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: process.env.NEXT_PUBLIC_BASE_URL + route.word(word.word),
    name: title,
    isPartOf: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/#website` },
    description,
    dateModified: app.lastModifiedWordsDate.toISOString(),
    inLanguage: 'fa-IR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'صفحه اصلی',
          item: process.env.NEXT_PUBLIC_BASE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: word.word,
          item: process.env.NEXT_PUBLIC_BASE_URL + route.word(word.word)
        }
      ]
    },
    mainEntity: {
      '@type': 'DefinedTerm',
      '@id': process.env.NEXT_PUBLIC_BASE_URL + route.word(word.word),
      name: word.word,
      alternateName: word.meaning,
      description: word.description
    },
    keywords
  };
};

const fetchWord = async (word: string): Promise<[Word | null, Array<Word> | null]> => {
  const words = await CsvService.getWords();
  const combinedData = await combineCsvData(words);

  const currentWord = combinedData.find((data) => data.word.toLowerCase() === word.toLowerCase());

  if (!currentWord) {
    return [null, null];
  }

  const randomWords = getRandomWordsExcludingIndex(combinedData, currentWord, 6);

  return [currentWord, randomWords];
};

const WordPage = async ({ params }: PageParams<{ word: string }>) => {
  const { word } = await params;
  const [wordData, randomWords] = await fetchWord(decodeURIComponent(word));

  if (!wordData) {
    notFound();
  }

  return (
    <>
      <Script
        id="word-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(wordData)).replace(/</g, '\\u003c')
        }}
      />
      <section className="my-7 flex flex-col items-center justify-center space-y-6 p-4">
        {/* Main Word Card */}
        <Card
          as="article"
          shadow="md"
          radius="lg"
          fullWidth
          className="max-w-2xl overflow-hidden bg-white">
          <CardHeader
            as="header"
            className="from-primary-500 to-primary-900 flex flex-col items-start bg-gradient-to-r p-6 text-white">
            <h1
              className="font-inter flex w-full flex-col text-3xl font-extrabold"
              dir="ltr">
              {wordData.word}
              <span className="text-medium">{wordData.pronunciation}</span>
            </h1>
            <ul className="flex items-center gap-1">
              {translateTags(wordData.tags).map(({ label, color, tag }) => (
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
            <p className="mt-2 text-lg">
              به معنی <strong className="font-bold">{wordData.meaning}</strong>
            </p>
            <h3 className="mt-1 text-sm text-gray-200">{wordData.description}</h3>
          </CardHeader>
          <CardBody
            as="section"
            className="p-6">
            <dl className="flex flex-col gap-4">
              <div className="border-l-4 border-blue-500 pl-4 text-gray-800">
                <dt className="font-semibold">مثال</dt>
                <dd
                  className="font-inter font-medium"
                  dir="ltr">
                  {wordData.example}
                </dd>
              </div>
              <div className="border-l-4 border-green-500 pl-4 text-gray-800">
                <dt className="font-semibold">ترجمه</dt>
                <dd className="font-medium">{wordData.translation}</dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        {/* Random Word Card */}
        <h2 className="text-center text-lg font-semibold">«چند کلمه انگلیسی جدید که می‌توانید امروز یاد بگیرید»</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {randomWords?.map((randomWord) => (
            <Link
              key={randomWord.id}
              href={route.word(randomWord.word)}>
              <Card
                shadow="md"
                radius="lg"
                fullWidth
                as="article"
                className="h-full overflow-hidden bg-white">
                <CardHeader
                  as="header"
                  className="flex flex-col items-start bg-gradient-to-r from-gray-500 to-gray-700 p-6 text-white">
                  <h3
                    className="font-inter flex w-full flex-col text-3xl font-extrabold"
                    dir="ltr">
                    {randomWord.word}
                    <span className="text-medium">{randomWord.pronunciation}</span>
                  </h3>
                  <ul className="flex items-center gap-1">
                    {translateTags(randomWord.tags).map(({ label, color, tag }) => (
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
                  <p className="mt-2 text-lg">
                    به معنی <strong className="font-bold">{randomWord.meaning}</strong>
                  </p>
                  <div className="mt-1 text-sm text-gray-200">{randomWord.description}</div>
                </CardHeader>
                <CardBody
                  as="section"
                  className="p-6">
                  <dl className="flex flex-col gap-4">
                    <div className="border-l-4 border-blue-500 pl-4 text-gray-800">
                      <dt className="font-semibold">مثال</dt>
                      <dd
                        className="font-inter font-medium"
                        dir="ltr">
                        {randomWord.example}
                      </dd>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 text-gray-800">
                      <dt className="font-semibold">ترجمه</dt>
                      <dd className="font-medium">{randomWord.translation}</dd>
                    </div>
                  </dl>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export const generateMetadata = async ({ params }: PageParams<{ word: string }>): Promise<Metadata> => {
  const { word } = await params;
  const decodedWord = decodeURIComponent(word);
  const [foundWord] = await fetchWord(decodedWord);
  const title = `معنی و ترجمه کلمه ${foundWord?.word ?? decodedWord} به فارسی`;
  const description = `${foundWord?.word ?? decodedWord} به معنی ${foundWord?.meaning} است. ${foundWord?.description}`;

  return {
    title,
    description,
    keywords: [
      `معنی ${foundWord?.word ?? decodedWord}`,
      `ترجمه ${foundWord?.word ?? decodedWord}`,
      `تلفظ ${foundWord?.word ?? decodedWord}`,
      `${foundWord?.word ?? decodedWord} meaning`,
      `${foundWord?.word ?? decodedWord} pronunciation`
    ],
    openGraph: {
      locale: 'fa-IR',
      type: 'website',
      title: `${title} | انگلیسی سریع`,
      description
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL + route.word(decodedWord)
    }
  };
};

export default WordPage;
