import React, { useState } from 'react';
import { Button, Drawer, Grid } from '@mantine/core';
import { useRouter } from 'next/router';
import { FilePlus } from 'tabler-icons-react';

function FormDrawer({
  icon = <FilePlus />,
  form,
  buttonText = 'Create new',
}: {
  icon?: JSX.Element;
  form?: JSX.Element;
  buttonText?: string;
}) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <Grid.Col span={12}>
      <Button leftIcon={icon} onClick={() => setOpened(true)}>
        {buttonText}
      </Button>
      <Drawer
        opened={opened}
        title={`Create new ${router.pathname.split('/')[1]} `}
        size="xl"
        padding="xl"
        position="right"
        onClose={() => setOpened(false)}
      >
        {form ? form : <div>Not yet implemented</div>}
      </Drawer>
    </Grid.Col>
  );
}

export default FormDrawer;
