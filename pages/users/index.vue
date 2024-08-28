<template>
  <ContainersPage title="users" subtitle="List of users">
    <template #actions>
      <FeaturesUserDialogForm />
    </template>
    <div>
      <FeaturesUserTable />
    </div>
  </ContainersPage>
</template>