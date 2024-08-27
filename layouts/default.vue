<template>
  <div class="flex h-screen items-start max-w-screen-2xl mx-auto">
    <Sidebar />
    <div class="w-full h-screen flex-1 overflow-auto">
      <Navbar />
      <main class="p-2 md:p-0">
        <slot />
      </main>
    </div>
  </div>
</template>