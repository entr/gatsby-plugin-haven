import { routeChangeHanlder } from './haven'

export function onRouteUpdate(_, pluginOptions = {}) {
  routeChangeHanlder(pluginOptions)
}
