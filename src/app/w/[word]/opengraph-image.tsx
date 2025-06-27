import { ImageResponse } from 'next/og';
import { CSSProperties } from 'react';
import { Word } from '~common/types/word.type';
import { combineCsvData } from '~helpers/database.helper';
import { CsvService } from '~services/csv.service';

export const alt = 'wwwords.ir';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/jpg';
export const runtime = 'edge';

type PosterProps = { word: Word | undefined };

const fetchWord = async (word: string) => {
  const words = await CsvService.getWords();
  const examples = await CsvService.getExamples();
  const combinedData = await combineCsvData(words, examples);
  return combinedData.find((data) => data.word.toLowerCase() === word.toLowerCase());
};

const generateStyle = ({
  x,
  y,
  size,
  weight = 500,
  color = '#000000',
  isRtl = false
}: {
  x: number;
  y: number;
  size: number;
  weight?: number;
  color?: string;
  isRtl?: boolean;
}): CSSProperties => ({
  position: 'absolute',
  left: `${x}px`,
  top: `${y}px`,
  fontSize: `${size}px`,
  fontWeight: weight,
  color,
  fontFamily: '"YekanBakh", "Inter", sans-serif',
  direction: isRtl ? 'rtl' : 'ltr',
  textAlign: isRtl ? 'right' : 'left'
});

const Poster = ({ word }: PosterProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #004040 0%, #004040 100%)',
      padding: '40px',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
    {/* Header */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '20px',
        zIndex: 1
      }}>
      <span style={{ fontSize: '20px', color: '#ffffff', fontWeight: 500 }}>wwwords.ir</span>
    </div>

    {/* Main Word Card */}
    <div
      style={{
        background: 'rgba(0, 64, 64, 0.1)',
        borderRadius: '16px',
        padding: '30px',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        zIndex: 1
      }}>
      {/* Word and Pronunciation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{
            ...generateStyle({ x: 0, y: 0, size: 64, weight: 800, color: '#ffffff' }),
            position: 'relative',
            textTransform: 'capitalize'
          }}>
          {word?.word || '-'}
        </h1>
        <span
          style={{
            ...generateStyle({ x: 0, y: 0, size: 24, weight: 400, color: '#ffffff' }),
            position: 'relative',
            fontStyle: 'italic'
          }}>
          {word?.pronunciation || '-'}
        </span>
      </div>

      {/* Meaning */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            ...generateStyle({ x: 0, y: 0, size: 20, weight: 600, color: '#FFFFFF', isRtl: true }),
            position: 'relative'
          }}>
          معنی
        </span>
        <p
          style={{
            ...generateStyle({ x: 0, y: 0, size: 18, weight: 400, color: '#E6E6FF', isRtl: true }),
            position: 'relative',
            maxWidth: '80%',
            lineHeight: '1.5'
          }}>
          {word?.meaning || '-'}
        </p>
      </div>

      {/* Example */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            ...generateStyle({ x: 0, y: 0, size: 20, weight: 600, color: '#FFFFFF', isRtl: true }),
            position: 'relative'
          }}>
          مثال
        </span>
        <p
          style={{
            ...generateStyle({ x: 0, y: 0, size: 18, weight: 400, color: '#E6E6FF' }),
            position: 'relative',
            maxWidth: '80%',
            lineHeight: '1.5',
            fontStyle: 'italic'
          }}>
          {word?.example || '-'}
        </p>
      </div>
    </div>
  </div>
);

const Image = async ({ params }: { params: { word: string } }) => {
  const { word } = params;
  const data = await fetchWord(decodeURIComponent(word));
  const yekanBakhFontData = await fetch(
    new URL('public/assets/fonts/yekan-bakh-no-en-regular.woff', import.meta.url)
  ).then((response) => response.arrayBuffer());

  try {
    return new ImageResponse(<Poster word={data} />, {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable'
      },
      fonts: [
        {
          name: 'YekanBakh',
          data: yekanBakhFontData,
          style: 'normal',
          weight: 400
        }
      ]
    });
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: '#1a1a40',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontSize: '24px'
          }}>
          خطا در تولید کارت کلمه
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'YekanBakh',
            data: yekanBakhFontData,
            style: 'normal',
            weight: 400
          }
        ]
      }
    );
  }
};

export default Image;
