import { Card, CardBody, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { WebPage, WithContext } from 'schema-dts';
import { route } from '~common/consts/route.const';
import { PageParams } from '~common/types/page-params.type';
import { Word } from '~common/types/word.type';
import { app } from '~configs/app.config';
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
      <div className="my-7 flex flex-col items-center justify-center space-y-6 p-4">
        {/* Main Word Card */}
        <Card
          shadow="md"
          radius="lg"
          className="w-full max-w-2xl overflow-hidden bg-white">
          <CardHeader className="from-primary-500 to-primary-900 flex flex-col items-start bg-gradient-to-r p-6 text-white">
            <h1
              className="font-inter text-end text-3xl font-extrabold"
              dir="ltr">
              {wordData.word}
              <p className="text-medium">{wordData.pronunciation}</p>
            </h1>
            <h2 className="mt-2 text-lg">
              به معنی <strong className="font-bold">{wordData.meaning}</strong>
            </h2>
            <h3 className="mt-1 text-sm text-gray-200">{wordData.description}</h3>
          </CardHeader>
          <CardBody className="space-y-4 p-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p
                className="font-inter font-medium text-gray-800"
                dir="ltr">
                <span className="font-yekan-bakh font-semibold">مثال:</span> {wordData.example}
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium text-gray-800">
                <span className="font-semibold">ترجمه:</span> {wordData.translation}
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Random Word Card */}
        <h6 className="text-center text-lg font-semibold">کلمات بعدی که می‌توانید امروز یاد بگیرید</h6>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {randomWords?.map((randomWord) => (
            <Card
              key={randomWord.id}
              shadow="md"
              radius="lg"
              as={Link}
              href={route.word(randomWord.word)}
              className="w-full overflow-hidden bg-white !transition-opacity">
              <CardHeader
                as="h4"
                className="flex flex-col items-start bg-gradient-to-r from-gray-500 to-gray-700 p-6 text-white">
                <div
                  className="font-inter text-end text-3xl font-extrabold"
                  dir="ltr">
                  {randomWord.word}
                  <p className="text-medium">{randomWord.pronunciation}</p>
                </div>
                <div className="mt-2 text-lg">
                  به معنی <strong className="font-bold">{randomWord.meaning}</strong>
                </div>
                <div className="mt-1 text-sm text-gray-200">{randomWord.description}</div>
              </CardHeader>
              <CardBody className="space-y-4 p-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p
                    className="font-inter font-medium text-gray-800"
                    dir="ltr">
                    <span className="font-yekan-bakh font-semibold">مثال:</span> {randomWord.example}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-800">
                    <span className="font-semibold">ترجمه:</span> {randomWord.translation}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
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
