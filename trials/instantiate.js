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
  const result = await granoDidClient.upload(wasmPath)

  const instantiateParams = {
    codeId: result.codeId
  }
  const instantiateResult = await granoDidClient.instantiate(instantiateParams)
  console.dir(instantiateResult, { depth: null })
}

main()

