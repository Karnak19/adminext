import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Avatar } from '@mantine/core';
import { useRouter } from 'next/router';

import StatusBadge from '../../components/StatusBadge';
import TableWithSearchAndFilter from '../../components/TableWithSearchAndFilter';
import TdClipboardId from '../../components/TdClipboardId';
import { useSelected } from '../../hooks/useSelectedStyle';
import { useGetFanByIdQuery, useGetFanProductsQuery, useGetFansQuery } from '.';
import { Fan } from './fetcher';

function FansList() {
  const router = useRouter();
  const {
    list: { data },
    search: { data: searchedData },
    searchState,
    setSearchState,
    ref,
  } = useGetFansQuery();

  const isRoot = router.pathname === '/fans';

  return (
    <TableWithSearchAndFilter
      items={data?.pages.flatMap((p) => p.items) || []}
      searchedItems={searchedData?.pages.flatMap((p) => p.items) || []}
      itemRenderer={(a) => <Item item={a} isRoot={isRoot} />}
      isRoot={isRoot}
      fuseKeys={['id', 'email']}
      cols={{
        always: ['imageUrl', 'email'],
        fullSize: ['username', 'status', 'profiles', 'products'],
      }}
      search={searchState}
      setSearch={setSearchState}
      lastRow={
        <tr ref={ref}>
          <td colSpan={7}>fetching more...</td>
        </tr>
      }
    />
  );
}

export default FansList;

export function Item({ item, isRoot }: { isRoot?: boolean; item: Fan }) {
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
