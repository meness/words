import { Checkbox } from '@nextui-org/checkbox';
import { getKeyValue } from '@nextui-org/shared-utils';
import { Spinner } from '@nextui-org/spinner';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useAsyncList } from '@react-stately/data';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Cursor, TableHeaderKeyLabel, TrainingWord, Word } from '~common/types';
import { appConfig } from '~configs';
import { deleteTrainingEntity, storeTrainingEntity } from '~helpers';
import { useTrainingsQuery } from '~hooks';
import { formatDecimal } from '~utils';

const columns: TableHeaderKeyLabel<TrainingWord[]>[] = [
  { key: 'id', label: '#' },
  { key: 'trained', label: '✅' },
  { key: 'word', label: 'کلمه' },
  { key: 'pronunciation', label: 'تلفظ' },
  { key: 'meaning', label: 'معنای حقوقی' },
  { key: 'description', label: 'توضیح' }
];

type WordsTableProps = {
  isLoading: boolean;
  words: Word[];
};

export const WordsTable = ({ isLoading, words }: WordsTableProps) => {
  const [hasMore, setHasMore] = useState(false);
  const trainings = useTrainingsQuery();

  const list = useAsyncList<TrainingWord, Cursor>({
    getKey(item) {
      return getKeyValue(item, 'id');
    },
    async load({ items, cursor }) {
      setHasMore(items.length !== words.length);

      const nextStart = cursor?.end ?? appConfig.rowsPerPage;
      const nextEnd = nextStart + appConfig.rowsPerPage;

      return {
        items: trainingWords.slice(cursor?.start ?? 0, cursor?.end ?? appConfig.rowsPerPage),
        cursor: {
          start: nextStart,
          end: nextEnd
        }
      };
    }
  });

  useEffect(() => {
    list.reload();
  }, [words]);

  const trainingWords = useMemo<TrainingWord[]>(
    () =>
      words.map<TrainingWord>((word) => {
        const isTrained = trainings.findIndex((training) => training.id === word.id) !== -1;
        const trainedWord = { ...word, trained: isTrained };

        list.update(word.id, trainedWord);

        return trainedWord;
      }),
    [words, trainings]
  );

  const [loaderRef, scrollerRef] = useInfiniteScroll({ hasMore, onLoadMore: list.loadMore });

  const handleCheckboxChange = async (item: (typeof words)[number], isSelected: boolean) => {
    if (isSelected) {
      await storeTrainingEntity(item);
    } else {
      await deleteTrainingEntity(item.id);
    }
  };

  return (
    <Table
      shadow="none"
      isStriped
      align="center"
      isHeaderSticky
      baseRef={scrollerRef}
      bottomContent={
        <div className="flex w-full justify-center">
          <AnimatePresence>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex w-full justify-center">
                <Spinner
                  aria-label="در حال بارگذاری"
                  size="sm"
                  color="primary"
                  ref={loaderRef}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
      classNames={{ base: 'min-h-[520px] max-h-[520px]', thead: 'select-none' }}>
      <TableHeader columns={columns}>
        {({ key, label }) => (
          <TableColumn
            key={key}
            align={['trained', 'pronunciation', 'index'].includes(key) ? 'center' : 'start'}
            dir={['pronunciation', 'word'].includes(key) ? 'ltr' : 'rtl'}>
            {key === 'trained' ? (
              <Checkbox
                size="lg"
                name="check-all"
                defaultSelected
                id="check-all"
                color="default"
                isDisabled
              />
            ) : (
              label
            )}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading || list.isLoading}
        loadingContent={
          <Spinner
            aria-label="در حال بارگذاری"
            size="lg"
            color="primary"
          />
        }
        emptyContent="چیزی برای نمایش وجود ندارد!"
        items={list.items}>
        {(item) => (
          <TableRow key={`${item.id}/${item.trained}`}>
            {(columnKey) => {
              const isTrainedColumn = columnKey === 'trained';
              const isWordColumn = columnKey === 'word';
              const isEnglishWord = ['word', 'pronunciation'].includes(String(columnKey));
              const isNonSelectable = ['id'].includes(String(columnKey));

              return (
                <TableCell
                  align={['trained', 'index'].includes(String(columnKey)) ? 'center' : isWordColumn ? 'left' : 'right'}
                  className={twJoin(isEnglishWord && 'font-inter', isNonSelectable && 'select-none')}
                  dir={isWordColumn ? 'ltr' : 'rtl'}>
                  {isTrainedColumn && (
                    <Checkbox
                      size="lg"
                      color="success"
                      name="check"
                      id="check"
                      defaultSelected={item.trained}
                      onValueChange={(isSelected) => {
                        handleCheckboxChange(item, isSelected);
                      }}
                    />
                  )}
                  {columnKey === 'id' ? formatDecimal(getKeyValue(item, columnKey)) : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
