import React, { useMemo, useRef } from 'react';
import { ScrollArea, SimpleGrid, Stack, Table, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Filter, Search } from 'tabler-icons-react';

import { useStickyHeader } from '../hooks/useStickyHeader';

interface IProps<T> {
  isRoot?: boolean;
  items: T[];
  searchedItems?: T[];
  itemRenderer: (item: T) => JSX.Element;
  fuseKeys: (keyof T)[];
  cols: {
    always: (keyof (T & Record<string, unknown>))[];
    fullSize: (keyof (T & Record<string, unknown>))[];
  };
  search?: string;
  setSearch?: (newValue: string) => void;
  lastRow: JSX.Element;
}

/**
 *
 * @param fuseKeys Keys for Fuse.js, associated with the filter input to filter out the view by fuzzy matching
 * @param isRoot Boolean to display the whole rows or not.
 */
function TableWithSearchAndFilter<T>({
  fuseKeys,
  isRoot,
  cols,
  itemRenderer,
  items,
  searchedItems,
  search,
  setSearch,
  lastRow,
}: IProps<T>) {
  const [filter, setFilter] = useDebouncedState('', 300);

  const parentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { classes, cx, setScrolled, scrolled } = useStickyHeader();

  const fuse = useMemo(
    () =>
      new Fuse(items || [], {
        keys: fuseKeys as string[],
        minMatchCharLength: 2,
      }),
    [items],
  );

  const results = useMemo(() => {
    if (filter) {
      return fuse.search(filter).map(({ item }) => itemRenderer(item));
    }

    if (search) {
      return searchedItems?.map(itemRenderer);
    }

    return items.map(itemRenderer);
  }, [items, filter, search]);

  return (
    <Stack>
      <SimpleGrid cols={2}>
        {new String(search) && !!setSearch && (
          <TextInput
            label="Search (in DB)"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${router.pathname.split('/')[1]}`}
            icon={<Search />}
          />
        )}
        <TextInput
          label="Filter (the current view)"
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`Filter by ${fuseKeys.join(', ')}`}
          icon={<Filter />}
        />
      </SimpleGrid>
      <ScrollArea
        viewportRef={parentRef}
        sx={{ height: '80vh' }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table striped highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              {cols.always.map((col) => (
                <th key={col.toString()}>{col.toString()}</th>
              ))}

              {isRoot && cols.fullSize.map((col) => <th key={col.toString()}>{col.toString()}</th>)}

              <th>Copy ID</th>
            </tr>
          </thead>
          <tbody>
            {results}
            {lastRow}
          </tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
}

export default TableWithSearchAndFilter;
