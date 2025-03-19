import './assets/main.css'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import singleSpaVue, { type SingleSpaProps } from 'single-spa-vue'
type Props = {
  name: string
  container: HTMLElement
  basePath: string
}
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      const { name, container, basePath } = this as unknown as Props
      //h的额外参数非必须，这里演示把host的参数传递给remote的根元素
      return h(App, {
        remoteName: name,
        mountContainer:container.id,
        remotePath: basePath,
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
  //在这里指定domElement为root传递过来的元素
  vueLifecycles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mount({ domElement: (prop as unknown as any).container, ...prop })
    .then((v) => {
      console.log(`mount event:`,v)
    })
    .catch((e) => {
      console.error(`mount error:`,e)
    })
}
export const unmount = vueLifecycles.unmount
