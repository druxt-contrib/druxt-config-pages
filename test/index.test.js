import NuxtModule from '../src'

const options = {
  baseUrl: 'https://demo-api.druxtjs.org',
  endpoint: '/jsonapi',
}

let mock

describe('DruxtConfigPages Nuxt module', () => {
  beforeEach(() => {
    mock = {
      addModule: jest.fn(),
      addTemplate: jest.fn(),
      extendRoutes: jest.fn(),
      nuxt: {
        hook: jest.fn(),
      },
      options: {},
      NuxtModule
    }
  })

  test('Init', () => {
    // Add Nuxt hook mock handler.
    const dirs = []
    mock.nuxt.hook = jest.fn((hook, fn) => fn(dirs))

    // Call Druxt module with module options.
    NuxtModule.call(mock, options)
  })
})
