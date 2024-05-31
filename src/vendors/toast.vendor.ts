import { type App } from 'vue'
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default {
  install: (app: App) => {
    const options: PluginOptions = {
      position: POSITION.TOP_RIGHT,
      timeout: 3000
    }

    app.use(Toast, options)
  }
}
