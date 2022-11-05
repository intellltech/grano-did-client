// @ts-check
'use strict'

const GranoDidConfig = require('../../lib/GranoDidConfig')
const { mockGranoDidConfigParams } = require('./../mocks/MockGranoDidConfig')

describe('GranoDidConfig', () => {
  describe('.create()', () => {
    test('instance of the class', () => {
      const config = GranoDidConfig.create(mockGranoDidConfigParams)
      expect(config).toBeInstanceOf(GranoDidConfig)
    })
  })
})
