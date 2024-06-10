import { type App } from 'vue'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

export default {
  install: (app: App) => {
    const options: VueQueryPluginOptions = {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true
          }
        }
      }
    }

    app.use(VueQueryPlugin, options)
  }
}
