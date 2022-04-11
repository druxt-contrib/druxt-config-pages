<template>
  <div>
    <h1>DruxtConfigPages example</h1>
    <h2>Text config:</h2>
    <dl>
      <dt>Boolean</dt>
      <dd>{{ config.boolean }}</dd>

      <dt>Date</dt>
      <dd>{{ config.date }}</dd>

      <dt>Email</dt>
      <dd>{{ config.email }}</dd>

      <dt>Text</dt>
      <dd>{{ config.text }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  computed: {
    config: ({ $druxtConfigPages }) => $druxtConfigPages.get('test')
  }
}
</script>
