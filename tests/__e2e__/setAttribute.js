// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

describe('GranoDidClient', () => {
  describe('setAttribute', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            firstRequest: {
              identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
              name: 'service.id',
              value: '#github',
              validity: 3600 * 24, // second
            },
            secondRequest: {
              identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
              name: 'service.id',
              value: '#twitter',
              validity: 3600 * 24, // second
            },
          },
          expected: {
            response: {
              logs: expect.any(Array),
              height: expect.any(Number),
              transactionHash: expect.any(String),
              gasWanted: expect.any(Number),
              gasUsed: expect.any(Number)
            },
            wasmEvent: {
              type: 'wasm',
              attributes: expect.arrayContaining([
                {
                  key: 'executeMsg',
                  value: 'setAttribute',
                },
                {
                  key: 'identifier',
                  value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
                },
                {
                  key: 'name',
                  value: 'service.id',
                },
                {
                  key: 'value',
                  value: '#github',
                },
                {
                  key: 'validTo',
                  value: expect.any(String),
                },
                {
                  key: 'previousChange',
                  value: '0',
                },
              ])
            },
            firstQueryAttributeResult: {
              values: ['#github']
            },
            secondQueryAttributeResult: {
              values: ['#github', '#twitter']
            },
            firstQueryValidToResult: {
              valid_to: '0'
            },
          }
        }
      ]

      test.each(tables)('params: $params', async ({
        params,
        expected,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: params.codeId
        }

        const result = await client.instantiate(instantiateParams)
        const contractAddress = result.contractAddress

        const setAttributeParams = {
          contractAddress: contractAddress,
          identifier: params.firstRequest.identifier,
          name: params.firstRequest.name,
          value: params.firstRequest.value,
          validity: params.firstRequest.validity,
        }

        const response = await client.setAttribute(setAttributeParams)
        expect(response).toMatchObject(expected.response)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expected.wasmEvent)

        // check queryAttribute
        const attributeParams = {
          contractAddress: contractAddress,
          identifier: params.firstRequest.identifier,
          name: params.firstRequest.name,
        }
        const queryAttributeResult = await client.attribute(attributeParams)
        expect(queryAttributeResult).toEqual(expected.firstQueryAttributeResult)

        // check queryValidTo
        const validToParams = {
          contractAddress: contractAddress,
          identifier: params.firstRequest.identifier,
          name: params.firstRequest.name,
          value: params.firstRequest.value,
        }
        const firstQueryValidToResult = await client.validTo(validToParams)
        expect(parseInt(firstQueryValidToResult.valid_to)).toBeGreaterThan(0)

        const secondSetAttributeParams = {
          contractAddress: contractAddress,
          identifier: params.secondRequest.identifier,
          name: params.secondRequest.name,
          value: params.secondRequest.value,
          validity: params.secondRequest.validity,
        }

        await client.setAttribute(secondSetAttributeParams)

        // check queryAttribute again
        const secondQueryAttributeResult = await client.attribute(attributeParams)
        expect(secondQueryAttributeResult).toEqual(expected.secondQueryAttributeResult)

        // check queryValidTo again
        const secondValidToParams = {
          contractAddress: contractAddress,
          identifier: params.secondRequest.identifier,
          name: params.secondRequest.name,
          value: params.secondRequest.value,
        }
        const secondQueryValidToResult = await client.validTo(secondValidToParams)
        expect(parseInt(secondQueryValidToResult.valid_to)).toBeGreaterThan(parseInt(firstQueryValidToResult.valid_to))
      })
    })
  })
})
