import 'regenerator-runtime/runtime'
import NuxtModule from '../src'

const options = {
  baseUrl: 'http://druxt-config-pages.ddev.site',
  configPages: {
    pages: ['foo']
  }
}

let mock

const mockData = [{
  attributes: {
    field_bar: true
  },
  relationships: {
    field_file: {
      data: { id: '1', type: 'file--file' }
    }
  }
}]
jest.mock('druxt', () => ({
  DruxtClient: jest.fn().mockImplementation(() => ({
    getCollection: jest.fn((resourceType) => resourceType.endsWith('bad')
      ? {}
      : { data: mockData }
    )
  }))
}))

describe('DruxtConfigPages Nuxt module', () => {
  beforeEach(() => {
    mock = {
      addModule: jest.fn(),
      addPlugin: jest.fn(),
      addTemplate: jest.fn(),
      extendRoutes: jest.fn(),
      nuxt: {
        hook: jest.fn(),
      },
      options: {},
      NuxtModule
    }
  })

  test('Init', async () => {
    const mockData = {}
    mock.$druxt = { axios: { get: jest.fn(() => ({ data: mockData })) } }

    // Call Druxt module with module options.
    await NuxtModule.call(mock, options)
  })

  test('Errors', async () => {
    // Call Druxt module with no module options.
    delete options.configPages
    try {
      await NuxtModule.call(mock, options)
    } catch (err) {
      expect(err.message).toBe("DruxtConfigPages: The configPages array requires atleast one entry.")
    }

    // Call Druxt module with bad module options.
    try {
      options.configPages = { pages: ['bad'] }
      await NuxtModule.call(mock, options)
    } catch (err) {
      expect(err.message).toBe("DruxtConfigPages: No data found for config page 'bad'.")
    }
  })
})
