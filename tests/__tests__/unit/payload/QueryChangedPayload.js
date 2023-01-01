// @ts-check
'use strict'

const QueryChangedPayload = require('../../../../lib/payload/QueryChangedPayload')

describe('QueryChangedPayload', () => {
  describe('.create()', () => {
    const tables = [
      {
        contractAddress: 'grano15v8jqq6aqhsuykdgdevx3qqcj9lp4h27ypsycds4cmv6er9qv0vsszmvnl',
        identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
      }
    ]
    test.each(tables)('params: %o', (params) => {
      const actual = QueryChangedPayload.create(params)
      expect(actual).toBeInstanceOf(QueryChangedPayload)
    })
  })
})

describe('QueryChangedPayload', () => {
  describe('buildParams()', () => {
    const tables = [
      {
        params: {
          contractAddress: 'grano15v8jqq6aqhsuykdgdevx3qqcj9lp4h27ypsycds4cmv6er9qv0vsszmvnl',
          identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
        },
        expected: {
          contractAddress: 'grano15v8jqq6aqhsuykdgdevx3qqcj9lp4h27ypsycds4cmv6er9qv0vsszmvnl',
          queryMsg: {
            changed: {
              identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
            }
          }
        }
      }
    ]
    test.each(tables)('params: %o', ({
      params,
      expected,
    }) => {
      const instance = QueryChangedPayload.create(params)
      const actual = instance.buildParams()

      expect(actual).toEqual(expected)
    })
  })
})

