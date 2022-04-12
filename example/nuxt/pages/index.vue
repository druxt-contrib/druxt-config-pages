<template>
  <div>
    <h1>DruxtConfigPages example</h1>
    <h2>Test config</h2>
    <pre><code>$druxtConfigPages.get('test')</code></pre>
    <DruxtDebug
      :json="$druxtConfigPages.get('test')"
      summary="Output"
      open
    />
  </div>
</template>
