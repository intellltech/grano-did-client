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

  const changedParams = {
    contractAddress: instantiateResult.contractAddress,
    identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
  }
  const queryControllerResult = await granoDidClient.changed(changedParams)
  console.dir(queryControllerResult, { depth: null })
}

main()

