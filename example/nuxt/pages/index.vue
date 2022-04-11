<template>
  <div>
    <h1>DruxtConfigPages example</h1>
    <h2>Text config:</h2>
    <dl>
      <dt>Boolean</dt>
      <dd>{{ $store.state.druxtConfigPages.test.attributes.field_boolean }}</dd>

      <dt>Date</dt>
      <dd>{{ $store.state.druxtConfigPages.test.attributes.field_date }}</dd>

      <dt>Email</dt>
      <dd>{{ $store.state.druxtConfigPages.test.attributes.field_email }}</dd>

      <dt>Text</dt>
      <dd>{{ $store.state.druxtConfigPages.test.attributes.field_text }}</dd>
    </dl>
  </div>
</template>
