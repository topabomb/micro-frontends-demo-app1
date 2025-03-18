import './assets/main.css'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import singleSpaVue, { type SingleSpaProps } from 'single-spa-vue'
type Props = {
  name: string
  basePath: string
}
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      const { name, basePath } = this as unknown as Props
      return h(App, {
        name: name,
        basePath: basePath,
      })
    },
  },
  handleInstance: (app, props: Props) => {
    //sspa的入口，同样需要跟mountVue一样app.use相关的组件，但这里没有app.mount
    app.use(createPinia())
    app.use(router(props.basePath))
  },
})
//vue模板项目的原始逻辑被封装在这个函数
const mountVue = () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router(import.meta.env.BASE_URL))
  app.mount('#app')
}
if (import.meta.env.MODE === 'development') {
  mountVue()
}
export const bootstrap = vueLifecycles.bootstrap
export const mount = async (prop: SingleSpaProps) => {
  vueLifecycles
    .mount(prop)
    .then((v) => {
      console.log(v)
    })
    .catch((e) => {
      console.error(e)
    })
}
export const unmount = vueLifecycles.unmount
