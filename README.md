# DruxtConfigPages

[![npm](https://badgen.net/npm/v/@druxt-contrib/config-pages)](https://www.npmjs.com/package/@druxt-contrib/config-pages)
[![Known Vulnerabilities](https://snyk.io/test/github/Decipher/druxt-config-pages/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Decipher/druxt-config-pages?targetFile=package.json)
[![CI](https://github.com/Decipher/druxt-config-pages/actions/workflows/ci.yml/badge.svg)](https://github.com/Decipher/druxt-config-pages/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Decipher/druxt-config-pages/branch/main/graph/badge.svg?token=TwCLJOKEjm)](https://codecov.io/gh/Decipher/druxt-config-pages)

> Decoupled Drupal configuration pages for Druxt

The DruxtConfigPages module consumes configuration data from the Drupal Config
Pages module and makes it easily accessible with a Vuex store and Nuxt plugin.

```js
$druxtConfigPages.get('foo.bar')
```

## Features

- Nuxt plugin:
  - `$druxtConfigPages.get('foo').bar`
  - `$druxtConfigPages.get('foo.bar')`
- Vuex store and getter:
  - `$store.getters['druxtConfigPages/foo'].bar`

## Links

- DruxtJS: https://druxtjs.org
- Community Discord server: https://discord.druxtjs.org
- Config Pages project page: https://www.drupal.org/project/config_pages

## Install and setup
### Drupal

1. Install and enable the [Drupal Config Pages module](https://www.drupal.org/project/config_pages) on your Druxt backend. 

2. Create at least one Config Page type and entity:
    `/admin/structure/config_pages/types`

3. Add the **"View the [foo] config page entity"** permission to the required Druxt role(s). 

### Nuxt.js

1. Install the Nuxt module:

    `$ npm install @druxt-contrib/config-pages`

2. Add module to `nuxt.config.js`

    ```js
    module.exports = {
      buildModules: ['@druxt-contrib/config-pages'],
      druxt: {
        baseUrl: 'https://demo-api.druxtjs.org',
        configPages: {
          pages: ['foo']
        }
      }
    }
    ```

    Note: Replace `foo` with the machine name of your Config Page type.

## Options

| Option | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `druxt.configPages.pages` | `array` | Yes | `[]` | An array of Config Page types. |
