import { DruxtClient } from 'druxt'
import { resolve } from 'path'

// eslint-disable-next-line no-unused-vars
const NuxtModule = async function (moduleOptions = {}) {
  // Set default options.
  const options = {
    baseUrl: moduleOptions.baseUrl,
    ...(this.options || {}).druxt || {},
    configPages: [
      ...moduleOptions.configPages || [],
      ...((this.options || {}).druxt || {}).configPages || [],
    ]
  }

  // Ensure the module is configured correctly.
  // @TODO - Load all available config pages?
  if (!options.configPages.length) {
    throw new Error('DruxtConfigPages is missing required configuration.')
  }

  // Get requested Config Pages data.
  const druxt = new DruxtClient(options.baseUrl, options)
  const configPages = Object.fromEntries((await Promise.all(options.configPages.map((configPage) => druxt.getCollection(`config_pages--${configPage}`))) || [])
    .map((o) => [o.data[0].type.split('--')[1], o.data[0]]))

  // Enable Vuex Store.
  this.options.store = true

  // Add Vuex plugin.
  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'store/druxt-config-pages.js',
    options: {
      configPages
    }
  })
}

export default NuxtModule
