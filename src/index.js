import { DruxtClient } from 'druxt'
import { resolve } from 'path'

// Config page data cache, keyed by base URL and page. Data is build-time static.
const cache = {}

// eslint-disable-next-line no-unused-vars
const NuxtModule = async function (moduleOptions = {}) {
  // Set default options.
  const options = {
    baseUrl: moduleOptions.baseUrl,
    ...((this.options || {}).druxt || {}),
    configPages: {
      pages: [],
      ...(moduleOptions.configPages || {}),
      ...(((this.options || {}).druxt || {}).configPages || {}),
    },
  }

  // Ensure the module is configured correctly.
  // @TODO - Load all available config pages?
  if (!options.configPages.pages.length) {
    throw new Error(
      'DruxtConfigPages: The configPages array requires at least one entry.'
    )
  }

  // Setup the DruxtClient.
  const druxt = new DruxtClient(options.baseUrl, {
    ...options,
    // Disable API Proxy, as Proxies aren't available at build.
    proxy: { ...(options.proxy || {}), api: false },
  })

  // Get requested Config Pages data.
  const configPages = {}
  for (const page of options.configPages.pages) {
    const cacheKey = [options.baseUrl, page].join(':')
    if (cache[cacheKey]) {
      configPages[page] = cache[cacheKey]
      continue
    }
    const { data } = await druxt.getCollection(`config_pages--${page}`)
    // Ensure the requested config exists.
    if (!(data || [])[0])
      throw new Error(
        `DruxtConfigPages: No data found for config page '${page}'.`
      )
    configPages[page] = data[0]
    cache[cacheKey] = data[0]
  }

  // Enable Vuex Store.
  this.options.store = true

  // Add Vuex plugin.
  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'store/druxt-config-pages.js',
    options: {
      configPages,
    },
  })
}

export default NuxtModule
