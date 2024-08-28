<template>
  <ContainersPage title="permissions" subtitle="List of permissions">
    <template #actions>
      <FeaturesPermissionsDialogForm />
    </template>
    <div>
      <FeaturesPermissionsTable />
    </div>
  </ContainersPage>
</template>