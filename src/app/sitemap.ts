import { MetadataRoute } from 'next';
import { combineCsvData } from '~helpers/database.helper';
import { CsvService } from '~services/csv.service';

const fetchWords = async () => {
  const words = await CsvService.getWords();
  const examples = await CsvService.getExamples();
  const combinedData = await combineCsvData(words, examples);

  return combinedData;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // FIX Google's limit is 50,000 URLs per sitemap
  // https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
  const words = await fetchWords();

  const wordsSitemap: MetadataRoute.Sitemap = words.map((word) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/w/${encodeURIComponent(word.word).toLowerCase()}`,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const homeSitemap: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL,
      changeFrequency: 'monthly',
      priority: 1.0
    }
  ];

  return [...homeSitemap, ...wordsSitemap];
};

export default sitemap;
