import Haven from '@chiiya/haven'

export let instance

export function routeChangeHanlder(options) {
  if (! instance) {
    // initial route enter
    instance = Haven.create(options)
  } else {
    // just init cookie preferences
    instance.cookiePreferences.init()
  }
}
