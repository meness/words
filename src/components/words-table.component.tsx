import { Checkbox } from '@nextui-org/checkbox';
import { getKeyValue } from '@nextui-org/shared-utils';
import { Spinner } from '@nextui-org/spinner';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useAsyncList } from '@react-stately/data';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { appConfig } from '~configs';
import { WordEntity } from '~entities';
import { deleteWord, isWordExists, storeWord } from '~helpers';

const columns = [
  { key: 'id', label: '#' },
  { key: 'checkbox', label: '✅' },
  { key: 'word', label: 'کلمه' },
  { key: 'pronunciation', label: 'تلفظ' },
  { key: 'translation', label: 'معنای حقوقی' },
  { key: 'description', label: 'توضیح' }
];

type WordsTableProps = {
  isLoading: boolean;
  words: WordEntity;
};

export const WordsTable = ({ isLoading, words }: WordsTableProps) => {
  const [reRenderTable, setReRenderTable] = useState(Math.random());
  const [isLoadingCheckboxes, setIsLoadingCheckboxes] = useState(true);
  const [checkedWords, setCheckedWords] = useState<Record<number, boolean>>({});
  const [hasMore, setHasMore] = useState(false);

  const list = useAsyncList<WordEntity[number], { start: number; end: number }>({
    async load({ items, cursor }) {
      setHasMore(items.length !== words.length);

      const nextStart = cursor?.end ?? appConfig.rowsPerPage;
      const nextEnd = nextStart + appConfig.rowsPerPage;

      return {
        items: words.slice(cursor?.start ?? 0, cursor?.end ?? appConfig.rowsPerPage),
        cursor: {
          start: nextStart,
          end: nextEnd
        }
      };
    }
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({ hasMore, onLoadMore: list.loadMore });

  useEffect(() => {
    const fetchCheckedStates = async () => {
      setIsLoadingCheckboxes(true);

      const states: Record<number, boolean> = {};

      for (const word of words) {
        states[word.id] = await isWordExists(word.id);
      }

      setCheckedWords(states);
      setIsLoadingCheckboxes(false);
      setReRenderTable(Math.random());
    };

    if (words.length) {
      fetchCheckedStates();
    } else {
      setIsLoadingCheckboxes(false);
    }
  }, [words]);

  const handleCheckboxChange = async (item: (typeof words)[number], isSelected: boolean) => {
    if (isSelected) {
      await storeWord(item);
    } else {
      await deleteWord(item.id);
    }

    setCheckedWords((prev) => ({ ...prev, [item.id]: isSelected }));
  };

  return (
    <Table
      shadow="none"
      isStriped
      align="center"
      key={reRenderTable}
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
            align={['checkbox', 'pronunciation', 'index'].includes(key) ? 'center' : 'start'}
            dir={['pronunciation', 'word'].includes(key) ? 'ltr' : 'rtl'}>
            {key === 'checkbox' ? (
              <Checkbox
                size="lg"
                name="check-all"
                id="check-all"
                color="primary"
                isDisabled
              />
            ) : (
              label
            )}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading || isLoadingCheckboxes}
        loadingContent={<Spinner />}
        emptyContent="متاسفانه نتیجه‌ای وجود ندارد!"
        items={list.items}>
        {(item) => (
          <TableRow key={item.word}>
            {(columnKey) => {
              const isCheckboxColumn = columnKey === 'checkbox';
              const isWordColumn = columnKey === 'word';
              const isItemChecked = !!checkedWords[item.id];
              const isEnglishWord = ['word', 'pronunciation'].includes(String(columnKey));

              return (
                <TableCell
                  align={['checkbox', 'index'].includes(String(columnKey)) ? 'center' : isWordColumn ? 'left' : 'right'}
                  className={twJoin(isEnglishWord ? 'font-inter' : '')}
                  dir={isWordColumn ? 'ltr' : 'rtl'}>
                  {isCheckboxColumn ? (
                    <Checkbox
                      size="lg"
                      color="success"
                      name="check"
                      id="check"
                      defaultSelected={isItemChecked}
                      onValueChange={(isSelected) => {
                        handleCheckboxChange(item, isSelected);
                      }}
                    />
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
