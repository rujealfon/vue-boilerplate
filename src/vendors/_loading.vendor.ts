import { type App } from 'vue'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  install: (app: App) => {
    app.use(
      LoadingPlugin,
      {
        // props
        color: 'red',
        width: 200,
        height: 200
      },
      {
        // slots
      }
    )
  }
}
