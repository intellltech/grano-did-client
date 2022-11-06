// @ts-check
'use strict'

const ExecuteSetAttributePayload = require('../../../../lib/payload/ExecuteSetAttributePayload')

describe('ExecuteSetAttributePayload', () => {
  describe('.create()', () => {
    const tables = [
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service.id',
        value: '#github',
        validity: 3600 * 24,
      },
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service.type',
        value: 'github',
        validity: 3600 * 24,
      },
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        name: 'service.serviceEndpoint',
        value: 'github.com/EG-easy',
        validity: 3600 * 24,
      }
    ]
    test.each(tables)('params: %o', (params) => {
      const actual = ExecuteSetAttributePayload.create(params)
      expect(actual ).toBeInstanceOf(ExecuteSetAttributePayload)
    })
  })
})

describe('ExecuteSetAttributePayload', () => {
  describe('buildParams()', () => {
    const tables = [
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'service.id',
          value: '#github',
          validity: 3600 * 24,
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            set_attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.id',
              value: '#github',
              validity: 3600 * 24,
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
          validity: 3600 * 24,
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            set_attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.type',
              value: 'github',
              validity: 3600 * 24,
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
          validity: 3600 * 24,
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            set_attribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.serviceEndpoint',
              value: 'github.com/EG-easy',
              validity: 3600 * 24,
            }
          }
        }
      }
    ]
    test.each(tables)('params: %o', ({
      params,
      expected,
    }) => {
      const instance = ExecuteSetAttributePayload.create(params)
      const actual = instance.buildParams()

      expect(actual).toEqual(expected)
    })
  })
})

