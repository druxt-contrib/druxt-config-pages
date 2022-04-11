export default ({ store }) => {
  const namespace = 'druxtConfigPages'

  const module = {
    namespaced: true,

    state: () => (<%= JSON.stringify(options) %>)
  }

  store.registerModule(namespace, module, {
    preserveState: Boolean(store.state[namespace])
  })
}
