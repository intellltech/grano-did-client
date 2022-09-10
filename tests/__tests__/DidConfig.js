// @ts-check
'use strict'

const DidConfig = require('../../lib/DidConfig')
const { mockDidConfigParams } = require('./../mocks/MockDidConfig')

describe('DidConfig', () => {
  describe('.create()', () => {
    test('instance of the class', () => {
      const config = DidConfig.create(mockDidConfigParams)
      expect(config).toBeInstanceOf(DidConfig)
    })
  })
})
