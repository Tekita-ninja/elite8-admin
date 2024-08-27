// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  plugins: [
    "@/plugins/EasyDataTable"
  ],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', 'nuxt-headlessui',"@pinia/nuxt"],
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