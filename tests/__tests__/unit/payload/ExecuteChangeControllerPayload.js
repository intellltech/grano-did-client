// @ts-check
'use strict'

const ExecuteChangeControllerPayload = require('../../../../lib/payload/ExecuteChangeControllerPayload')

describe('ExecuteChangeControllerPayload', () => {
  describe('.create()', () => {
    const tables = [
      {
        contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
        identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
        newController: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
      }
    ]
    test.each(tables)('params: %o', (params) => {
      const actual = ExecuteChangeControllerPayload.create(params)
      expect(actual ).toBeInstanceOf(ExecuteChangeControllerPayload)
    })
  })
})

describe('ExecuteChangeControllerPayload', () => {
  describe('buildParams()', () => {
    const tables = [
      {
        params: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          newController: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
        },
        expected: {
          contractAddress: 'wasm1aqt08e8rfn0n3yl8wnecskne2kgh6ghnet0w8k3k963qnwfllctszm6zqm',
          executeMsg: {
            change_controller: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              new_controller: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
            }
          }
        }
      }
    ]
    test.each(tables)('params: %o', ({
      params,
      expected,
    }) => {
      const instance = ExecuteChangeControllerPayload.create(params)
      const actual = instance.buildParams()

      expect(actual).toEqual(expected)
    })
  })
})

