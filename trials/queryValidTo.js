// @ts-check
'use strict'

const GranoDidClient = require('../lib/GranoDidClient')
const GranoDidConfig = require('../lib/GranoDidConfig')
const { mockGranoDidConfig } =require('./../tests/mocks/MockGranoDidConfig')


const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled({
    config: mockGranoDidConfig,
  })
  const wasmPath = './wasm/did_contract.wasm'
  const result = await granoDidClient.upload({ wasmPath: wasmPath })

  const instantiateParams = {
    codeId: result.codeId
  }
  const instantiateResult = await granoDidClient.instantiate(instantiateParams)

  const validToParams = {
    contractAddress: instantiateResult.contractAddress,
    identifier: 'wasm1edz508tre9d9n9nf8r82prpafhds9v6dp0su0y',
    name: 'service',
    value: '{"id":"#linkedin","type":"linkedin","serviceEndpoint":"linkedin.com/in/henry-tsai-6b884014"}',
  }
  const queryValidToResult = await granoDidClient.validTo(validToParams)
  console.dir(queryValidToResult, { depth: null })
}

main()

