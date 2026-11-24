# Reading configuration

How a configuration page reaches a page of the site, and what arrives.

- [Read while the site builds](#read-while-the-site-builds)
- [The plugin](#the-plugin)
- [The store](#the-store)
- [The field names](#the-field-names)
- [The shape of a value](#the-shape-of-a-value)
- [A field that references something](#a-field-that-references-something)
- [The whole entity](#the-whole-entity)
- [Changing a value in Drupal](#changing-a-value-in-drupal)

## Read while the site builds

At build time, once per configuration page, by the Nuxt module itself. The
values are written into a generated store module, so a page that reads them
does not request anything and has nothing to wait for.

What follows from that:

- The build needs to reach Drupal. A build on a machine that cannot see the
  backend fails, and fails before the site renders anything.
- The API proxy is off for this request. A proxy is a server route of the
  built site, and it does not exist yet while the site is being built, so the
  module calls `baseUrl` directly even where `druxt.proxy.api` is on.
- A value changed in Drupal reaches the site on its next build. There is no
  revalidation and no cache to clear.

A site whose configuration has to change without a build should read the
configuration page through Druxt as an entity instead, where the request
happens in the browser or on each server render.

## The plugin

`$druxtConfigPages.get()` takes a configuration page's machine name and
returns its fields:

```js
export default {
  computed: {
    support: ({ $druxtConfigPages }) => $druxtConfigPages.get('site_settings'),
  },
}
```

A dot reads one field out of the page:

```js
$druxtConfigPages.get('site_settings.support_email')
```

The dot goes one level deep and no further. `get('site_settings.address.city')`
returns the whole `address` value, not its `city`: the part after the second
dot is ignored rather than refused. Read the field and then walk into it:

```js
$druxtConfigPages.get('site_settings.address').city
```

The plugin is available wherever Nuxt injects, so `this.$druxtConfigPages` in
a component, `$druxtConfigPages` in a computed property's context, and
`context.app.$druxtConfigPages` in a plugin or middleware.

## The store

The same values are a Vuex getter, one per configuration page, under the
`druxtConfigPages` namespace:

```js
this.$store.getters['druxtConfigPages/site_settings'].support_email
```

The getter and the plugin return the same object. Use the getter where a store
module or an action needs the values, and the plugin everywhere else.

## The field names

Only fields are passed on, and each one loses its `field_` prefix:

| In Drupal             | In the site     |
| --------------------- | --------------- |
| `field_support_email` | `support_email` |
| `field_address`       | `address`       |
| `label`               | not passed on   |
| `changed`             | not passed on   |

A field named without the prefix, which Drupal allows on a base field but not
on one added through the field UI, is not passed on either. The names are not
converted to camel case: `field_support_email` is `support_email`, not
`supportEmail`.

## The shape of a value

Exactly as JSON:API wrote it. The module takes the entity's `attributes` and
passes them through, so the shape is the field type's:

```js
// A plain text field.
$druxtConfigPages.get('site_settings.support_email') // 'help@example.com'

// A formatted text field.
$druxtConfigPages.get('site_settings.body')
// { value: '<p>…</p>', format: 'basic_html', processed: '<p>…</p>' }

// A field that holds more than one value.
$druxtConfigPages.get('site_settings.phone') // ['+61 …', '+61 …']

// A boolean, a date, a number: the scalar JSON:API sends.
$druxtConfigPages.get('site_settings.show_banner') // true
```

A field left empty is `null`, and a multi-value field left empty is `[]`.

## A field that references something

A reference field is a JSON:API relationship, and what arrives is the
identifier rather than the thing:

```js
$druxtConfigPages.get('site_settings.logo')
// { type: 'file--file', id: '7b1f…' }
```

The file's URL, the term's name and the referenced node's title are on the
other entity, which this module does not fetch. Read it with Druxt:

```js
const { data } = await this.$druxt.getResource(
  'file--file',
  this.$druxtConfigPages.get('site_settings.logo').id
)
```

A reference field that holds more than one value is an array of those
identifiers.

## The whole entity

The store's state holds each page's JSON:API resource untouched, which is
where to go for anything the getter drops:

```js
this.$store.state.druxtConfigPages.site_settings.attributes.label
this.$store.state.druxtConfigPages.site_settings.id
```

This is the raw resource, so it is `attributes` and `relationships` as
JSON:API sends them, with the `field_` prefixes still on.

## Changing a value in Drupal

Save the configuration page, then build the site again. In development,
restart `nuxt dev`: the values are read while the module starts up, so an
already running server keeps the ones it read.
