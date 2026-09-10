---
'@druxt-contrib/config-pages': patch
---

Config page data is now cached per process, keyed by base URL and page, so repeated builds stop re-fetching static data.
