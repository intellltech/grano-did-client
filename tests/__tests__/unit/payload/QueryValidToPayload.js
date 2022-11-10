// @ts-check
'use strict'

const QueryValidToPayload = require('../../../../lib/payload/QueryValidToPayload')

describe('QueryValidToPayload', () => {
  describe('.create()', () => {
    const tables = [
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service',
        value: '{"id":"#github","type":"github","serviceEndpoint":"github.com/EG-easy"},',
      }
    ]
    test.each(tables)('params: %o', (params) => {
      const actual = QueryValidToPayload.create(params)
      expect(actual ).toBeInstanceOf(QueryValidToPayload)
    })
  })
})

describe('QueryValidToPayload', () => {
  describe('buildParams()', () => {
    const tables = [
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'service',
          value: '{"id":"#github","type":"github","serviceEndpoint":"github.com/EG-easy"},',
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          queryMsg: {
            valid_to: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service',
              value: '{"id":"#github","type":"github","serviceEndpoint":"github.com/EG-easy"},',
            }
          }
        }
      }
    ]
    test.each(tables)('params: %o', ({
      params,
      expected,
    }) => {
      const instance = QueryValidToPayload.create(params)
      const actual = instance.buildParams()

      expect(actual).toEqual(expected)
    })
  })
})

