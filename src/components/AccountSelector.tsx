import React from 'react';
import { Autocomplete } from '@mantine/core';
import { UserSearch } from 'tabler-icons-react';

import useAccountsQuery from '../hooks/useAccountsQuery';
import { useStore } from '../store';

function AccountSelector() {
  const { data, isLoading } = useAccountsQuery();

  const selectedAccount = useStore((state) => state.account);
  const select = useStore((state) => state.selectAccount);

  return (
    <Autocomplete
      label="pick an account"
      placeholder="Choose an account"
      icon={<UserSearch />}
      defaultValue={selectedAccount?.name}
      data={(data ?? []).map((account) => ({
        value: account.name,
        id: account.id,
        accountKey: account.key,
      }))}
      dropdownPosition="top"
      disabled={isLoading}
      onItemSubmit={(value) =>
        select({
          id: value.id,
          key: value.accountKey,
          name: value.value,
        })
      }
    />
  );
}

export default AccountSelector;
