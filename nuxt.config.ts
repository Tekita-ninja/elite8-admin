// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      title: "Elite Eight",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
        {
          name: "og:title",
          content: "Elite Eight"
        },
      ],
    },
  },
  plugins: [
    "@/plugins/EasyDataTable"
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
    'nuxt-headlessui',
    "@pinia/nuxt",
    "dayjs-nuxt"
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  headlessui: {
    prefix: 'H'
  }
})