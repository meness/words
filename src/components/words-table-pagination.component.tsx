import { Pagination } from '@nextui-org/pagination';
import { Dispatch, SetStateAction } from 'react';

type WordsTablePaginationProps = {
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
};

export const WordsTablePagination = ({ isLoading, page, totalPages, onPageChange }: WordsTablePaginationProps) => (
  <Pagination
    isCompact
    dir="ltr"
    showControls
    color="secondary"
    isDisabled={isLoading || !totalPages}
    page={page}
    initialPage={1}
    total={totalPages}
    onChange={onPageChange}
  />
);
