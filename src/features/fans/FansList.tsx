import React, { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Avatar, ScrollArea, Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Users } from 'tabler-icons-react';

import StatusBadge from '../../components/StatusBadge';
import TdClipboardId from '../../components/TdClipboardId';
import { useSelected } from '../../hooks/useSelectedStyle';
import { useStickyHeader } from '../../hooks/useStickyHeader';
import { useGetFanByIdQuery, useGetFanProductsQuery, useGetFansQuery } from '.';
import { Fan } from './fetcher';

function FansList({ isRoot }: { isRoot?: boolean }) {
  const [search, setSearch] = useState('');

  const { data, ref } = useGetFansQuery();

  const fans = data?.pages.flatMap((p) => p.items) || [];

  const { classes, cx, setScrolled, scrolled } = useStickyHeader();

  const fuse = useMemo(
    () =>
      new Fuse(fans || [], {
        keys: ['email', 'username', 'id'],
        minMatchCharLength: 2,
      }),
    [data],
  );

  const fuzzyResults = useMemo(
    () =>
      fuse?.search(search).map(({ item }) => {
        return <Item key={item.id} item={item} isRoot={isRoot} />;
      }),
    [fuse, search],
  );

  const results = fans?.map((item) => <Item key={item.id} item={item} isRoot={isRoot} />);

  return (
    <Stack>
      <div>
        <TextInput
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter fans"
          icon={<Users />}
        />
      </div>
      <ScrollArea sx={{ height: '80vh' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table striped highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              {isRoot && (
                <>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Profiles</th>
                  <th>Products</th>
                </>
              )}
              <th>Copy ID</th>
            </tr>
          </thead>
          <tbody>
            {search ? fuzzyResults : results}
            <tr ref={ref}>
              <td colSpan={7}>fetching more...</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
}

export default FansList;

function Item({ item, isRoot }: { isRoot?: boolean; item: Fan }) {
  const router = useRouter();
  const { classes, isSelected } = useSelected('fanId');

  const { inView, ref } = useInView();
  const { inView: productsInView, ref: productsRef } = useInView();

  const { data } = useGetFanByIdQuery(item.id, inView);
  const { data: products } = useGetFanProductsQuery(item.id, productsInView);

  return (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={item.id}
      onClick={() => router.push(`/fans/${item.id}?tabs=general`)}
      className={isSelected(item.id) ? classes.root : undefined}
    >
      <td>
        <Avatar color="blue" src={`${item.imageUrl}`} alt={item.username} />
      </td>
      <td>{item.email}</td>
      {isRoot && (
        <>
          <td>{item.username}</td>
          <td>
            <StatusBadge status={item.status} />
          </td>
          <td ref={ref}>{data?.Profiles.length}</td>
          <td ref={productsRef}>{products?.items.length}</td>
        </>
      )}
      <TdClipboardId id={item.id} />
    </tr>
  );
}
