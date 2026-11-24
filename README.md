<!-- vale off -->
<!-- The alt text describes what the banner shows: the @druxt-contrib/config-pages mark, name and description. The name-colon-description form trips ColonUsage. -->
<a href="https://druxtjs.org">
  <img src=".github/banner.svg" alt="@druxt-contrib/config-pages: Config Pages module for Druxt">
</a>
<!-- vale on -->

# DruxtConfigPages

[![npm](https://img.shields.io/npm/v/@druxt-contrib/config-pages)](https://www.npmjs.com/package/@druxt-contrib/config-pages)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://contrib.druxtjs.org/druxt-config-pages/)
[![npm@dev](https://img.shields.io/npm/v/@druxt-contrib/config-pages/dev)](https://www.npmjs.com/package/@druxt-contrib/config-pages/v/dev)
[![CI](https://github.com/druxt-contrib/druxt-config-pages/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/druxt-contrib/druxt-config-pages/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/druxt-contrib/druxt-config-pages/branch/develop/graph/badge.svg)](https://codecov.io/gh/druxt-contrib/druxt-config-pages)
[![Known Vulnerabilities](https://snyk.io/test/github/druxt-contrib/druxt-config-pages/badge.svg?targetFile=package.json)](https://snyk.io/test/github/druxt-contrib/druxt-config-pages?targetFile=package.json)
[![Discord](https://img.shields.io/discord/753866667590680587?label=discord&logo=discord&logoColor=white)](https://discord.druxtjs.org)

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

- [DruxtJS](https://druxtjs.org)
- [Community Discord server](https://discord.druxtjs.org)
- [Config Pages project page](https://www.drupal.org/project/config_pages)

## Install and setup

### Drupal

[Drupal setup](docs/drupal-setup.md) covers each of these in full.

1. Install and enable the [Drupal Config Pages module](https://www.drupal.org/project/config_pages) on your Druxt backend.

2. Create at least one Config Page type and entity:
   `/admin/structure/config_pages/types`

3. Add the **"View the [foo] config page entity"** permission to the required Druxt role(s).

### Nuxt.js

1. Install the Nuxt modules:

   `$ npm install druxt @druxt-contrib/config-pages`

2. Add module to `nuxt.config.js`

   ```js
   module.exports = {
     buildModules: ['@druxt-contrib/config-pages'],
     druxt: {
       baseUrl: 'https://cms.example.com',
       configPages: {
         pages: ['foo'],
       },
     },
   }
   ```

   Replace `foo` with the machine name of your Config Page type.

## Options

| Option                    | Type    | Required | Default | Description                    |
| ------------------------- | ------- | -------- | ------- | ------------------------------ |
| `druxt.configPages.pages` | `array` | Yes      | `[]`    | An array of Config Page types. |

## More documentation

These pages are also published as a [documentation site](https://contrib.druxtjs.org/druxt-config-pages/).

- [Drupal setup](docs/drupal-setup.md): the module, a configuration page type,
  fields and permissions
- [Reading configuration](docs/usage.md): the plugin, the store, the field
  names and when the values are read
- [Troubleshooting](docs/troubleshooting.md)
- [The example](https://github.com/druxt-contrib/druxt-config-pages/tree/develop/example),
  a Nuxt site and a Drupal site with Config Pages
- [Contributing](CONTRIBUTING.md)
