const baseUrl = process.env.GITPOD_WORKSPACE_ID
  ? `https://8080-${process.env.GITPOD_WORKSPACE_ID}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
  : 'http://druxt-config-pages.ddev.site'

export default {
  buildModules: [
    '@druxt-contrib/config-pages',
    'druxt',
  ],
  druxt: {
    baseUrl,
    proxy: { api: true },
    configPages: {
      pages: ['test']
    }
  }
}
