// @ts-check
'use strict'

const ExecuteRevokeAttributePayload = require('../../../../lib/payload/ExecuteRevokeAttributePayload')

describe('ExecuteRevokeAttributePayload', () => {
  describe('.create()', () => {
    const tables = [
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service.id',
        value: '#github',
      },
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service.type',
        value: 'github',
      },
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service.serviceEndpoint',
        value: 'github.com/EG-easy',
      }
    ]
    test.each(tables)('params: %o', (params) => {
      const actual = ExecuteRevokeAttributePayload.create(params)
      expect(actual ).toBeInstanceOf(ExecuteRevokeAttributePayload)
    })
  })
})

describe('ExecuteRevokeAttributePayload', () => {
  describe('buildParams()', () => {
    const tables = [
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'service.id',
          value: '#github',
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            revoke_attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.id',
              value: '#github',
            }
          }
        }
      },
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'service.type',
          value: 'github',
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            revoke_attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.type',
              value: 'github',
            }
          }
        }
      },
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'service.serviceEndpoint',
          value: 'github.com/EG-easy',
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            revoke_attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.serviceEndpoint',
              value: 'github.com/EG-easy',
            }
          }
        }
      }
    ]
    test.each(tables)('params: %o', ({
      params,
      expected,
    }) => {
      const instance = ExecuteRevokeAttributePayload.create(params)
      const actual = instance.buildParams()

      expect(actual).toEqual(expected)
    })
  })
})

