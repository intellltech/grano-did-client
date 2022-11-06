// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../../lib/GranoDidClient')

const { mockGranoDidConfig } = require('../../mocks/MockGranoDidConfig')
const MockSigningCosmWasmClient = require('../../mocks/MockSigningCosmWasmClient')

describe('GranoDidClient', () => {
  describe('.create()', () => {
    test('instance of the class', () => {
      const client = GranoDidClient.create()

      expect(client)
        .toBeInstanceOf(GranoDidClient)
    })
  })
})

describe('GranoDidClient', () => {
  describe('.createFulfilled()', () => {
    test('instance of the class', async () => {
      const mockConnectWithSigner = jest.fn().mockReturnValue(MockSigningCosmWasmClient.connectWithSigner())
      SigningCosmWasmClient.connectWithSigner = mockConnectWithSigner

      const client = await GranoDidClient.createFulfilled({
        OriginalSigningCosmWasmClient: SigningCosmWasmClient,
        config: mockGranoDidConfig,
      })

      expect(client)
        .toBeInstanceOf(GranoDidClient)
    })
  })
})

describe('GranoDidClient', () => {
  describe('.upload()', () => {
    describe('upload successfully', () => {
      const tables = [
        {
          wasmPath: './wasm/did_contract.wasm',
          expected: {
            originalSize: expect.any(Number),
            originalChecksum: expect.any(String),
            compressedSize: expect.any(Number),
            compressedChecksum: expect.any(String),
            codeId: expect.any(Number),
            height: expect.any(Number),
            logs: expect.any(Array),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number),
          }
        }
      ]

      test.each(tables)('wasmPath: $wasmPath', async ({
        wasmPath,
        expected,
      }) => {
        const mockSigningCosmWasmClient = new MockSigningCosmWasmClient()

        const client = GranoDidClient.create({
          signingCosmWasmClient: /** @type{*} */ (mockSigningCosmWasmClient),
          granoDidConfig: mockGranoDidConfig,
        })

        const actual = await client.upload({ wasmPath: wasmPath })

        expect(actual).toMatchObject(expected)
      })
    })
  })
})
