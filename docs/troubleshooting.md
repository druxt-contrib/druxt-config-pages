# Troubleshooting

The module does its work while the site builds, so most of what can go wrong
stops the build with a message rather than showing on a page.

- [The build](#the-build)
- [A page](#a-page)
- [Values](#values)

## The build

### `DruxtConfigPages: The configPages array requires at least one entry.`

`druxt.configPages.pages` is empty or missing. The module reads the pages it
is told to read and has no way to discover the rest, so a site that installs
it has to name at least one:

```js
druxt: {
  configPages: { pages: ['site_settings'] },
}
```

Options set on the module itself are read too, so
`buildModules: [['@druxt-contrib/config-pages', { configPages: { pages: […] } }]]`
works as well. The `druxt` key wins where both are set.

### `DruxtConfigPages: No data found for config page 'foo'.`

JSON:API answered, and its `data` was empty. One of four things:

- The type has no saved entity. Open `/admin/structure/config_pages` and save
  the page once.
- The machine name is wrong. It is the type's machine name, not its label, and
  not the field's.
- The role the site reads as lacks `view foo config page entity`. A collection
  JSON:API cannot show comes back empty rather than refused, so this reads as
  missing data.
- The type exists but JSON:API does not expose it, which happens where
  JSON:API Extras has it disabled.

[Drupal setup](drupal-setup.md#check-the-site) has the request to check with.

### The build cannot reach Drupal

`ECONNREFUSED`, `ENOTFOUND` or a timeout naming `druxt.baseUrl`. The values
are read while the module starts up, so the backend has to be reachable from
wherever the build runs, including in CI and on a deployment host. A site that
builds locally and fails in CI is usually a `baseUrl` only the local machine
resolves.

The API proxy does not help here. It is a route of the built site, and it does
not exist yet, so this request goes to `baseUrl` directly whatever
`druxt.proxy.api` is set to.

### `Syntax Error: Unexpected token, expected ","` in `.nuxt/store/druxt-config-pages.js`

Fixed in 0.1.3. Versions before it wrote the generated store without the
separators between pages, so a site reading more than one page failed to
compile. Upgrade:

```sh
npm install @druxt-contrib/config-pages@^0.1.3
```

## A page

### `Cannot read properties of undefined (reading '…')`

`get('page.field')` where `page` is not one of the pages the build read. The
plugin looks the page up and then reads the field out of what it found, so a
name that is not there fails on the second step. Check the name against
`druxt.configPages.pages`, and that the build reported no error for it.

### `$druxtConfigPages.get()` returns `undefined`

The page name is not one the build read. `get('site-settings')` is not
`get('site_settings')`: it is the machine name, spelled with `_`.

### A field is `undefined`

Either the field's name still has its `field_` prefix on it, or it is not a
field. `field_support_email` is read as `support_email`, and the entity's own
properties, such as `label`, are not passed on at all.
[Reading configuration](usage.md#the-field-names) has both rules, and
[the whole entity](usage.md#the-whole-entity) is where `label` lives.

### A field holds an object with `type` and `id`

It is a reference field, and what arrives is the identifier of the thing
referenced.
[A field that references something](usage.md#a-field-that-references-something)
shows how to read the rest.

## Values

### A change in Drupal is not on the site

The values are read once, while the site builds. Build again. In development,
restart `nuxt dev`: a running server keeps what it read when it started.

### A value is stale in a deployed site

Same cause. A statically generated site holds the values its build read, so
the deployment pipeline has to run again for a configuration change to land.
A site that needs configuration to change without a deployment should read the
configuration page as an entity through Druxt instead.
