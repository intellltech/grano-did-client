// @ts-check
'use strict'

const QueryAttributePayload = require('../../../../lib/payload/QueryAttributePayload')

describe('QueryAttributePayload', () => {
  describe('.create()', () => {
    const tables = [
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service',
      }
    ]
    test.each(tables)('params: %o', (params) => {
      const actual = QueryAttributePayload.create(params)
      expect(actual ).toBeInstanceOf(QueryAttributePayload)
    })
  })
})

describe('QueryAttributePayload', () => {
  describe('buildParams()', () => {
    const tables = [
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'service',
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          queryMsg: {
            attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service',
            }
          }
        }
      }
    ]
    test.each(tables)('params: %o', ({
      params,
      expected,
    }) => {
      const instance = QueryAttributePayload.create(params)
      const actual = instance.buildParams()

      expect(actual).toEqual(expected)
    })
  })
})

