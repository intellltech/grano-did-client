// @ts-check
'use strict'

const DidConfig = require('../../lib/DidConfig')

describe('DidConfig', () => {
  describe('.create()', () => {
    test('instance of the class', () => {
      const mockDidConfigParams = {
        endPoint: 'http://localhost:26657'
      }

      const config = DidConfig.create(mockDidConfigParams)
      expect(config).toBeInstanceOf(DidConfig)
    })
  })
})
