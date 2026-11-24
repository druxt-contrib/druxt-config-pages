# Drupal setup

What the Drupal site needs before a Druxt site can read its configuration
pages. The repository's own `example/drupal` is built against Drupal 9.4.8,
Config Pages 2.10.0 and the Druxt module 1.1.1, and nothing here is specific
to those versions.

- [The module](#the-module)
- [A configuration page type](#a-configuration-page-type)
- [Fields](#fields)
- [Permissions](#permissions)
- [Check the site](#check-the-site)

## The module

1. Install [Config Pages](https://www.drupal.org/project/config_pages):

   ```sh
   composer require drupal/config_pages
   drush pm:install config_pages
   ```

2. Install the [Druxt module](https://www.drupal.org/project/druxt), or
   JSON:API on its own. The configuration pages are read over JSON:API, so
   that is the only part this module needs.

   ```sh
   composer require drupal/druxt
   drush pm:install druxt
   ```

## A configuration page type

A configuration page type is the shape; a configuration page is the one entity
that holds the values. Both are needed: a type with no entity has nothing for
the site to read, and the build fails on it.

1. Add a type at `/admin/structure/config_pages/types`. Its machine name is
   what the site asks for, so `site_settings` here is
   `pages: ['site_settings']` in `nuxt.config.js`.

2. Fill the page in at `/admin/structure/config_pages`. Saving it once is
   enough; until it is saved there is no entity and no JSON:API resource to
   read.

A type can be set to vary by context, such as by language. Only one entity is
read per type, so a site that needs the variants has to read them itself
through Druxt rather than through this module.

## Fields

Add the fields to the type as on any other entity. The site reads only the
fields whose machine name begins with `field_`, and reads each one without
that prefix: `field_support_email` arrives as `support_email`.
[Reading configuration](usage.md#the-field-names) has the rule.

The type's own properties, `label`, `changed` and the rest, are not passed on.
A value the site needs belongs in a field.

A field that references another entity, such as a file or a taxonomy term,
arrives as a JSON:API resource identifier rather than as the thing itself.
[Reading configuration](usage.md#a-field-that-references-something) covers
what to do with one.

## Permissions

Each type has its own view permission,
`view <machine name> config page entity`. Grant it to the role the Druxt site
reads as:

```sh
drush role:perm:add anonymous 'view site_settings config page entity'
```

An anonymous site reads as `anonymous`. A site that authenticates reads as
whichever role its account or OAuth client holds. A collection JSON:API cannot
show answers 200 with an empty `data` array rather than 403, so a missing
permission reaches the build as "no data found" rather than as a refusal. The
response's `meta.omitted` names what was left out, where it is present.

## Check the site

The resource is `config_pages--<machine name>`:

```sh
curl -s 'https://cms.example.com/jsonapi/config_pages/site_settings' | \
  python3 -m json.tool
```

`data` holds one entity, with the fields under `attributes` and
`relationships`. An empty `data` array means the page has not been saved, or
the role cannot view it.
