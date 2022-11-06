// @ts-check
'use strict'

const DidClient = require('../lib/GranoDidClient')
const DidConfig = require('../lib/GranoDidConfig')
const { mockGranoDidConfig } =require('./../tests/mocks/MockGranoDidConfig')


const main = async () => {
  const granoDidClient = await DidClient.createFulfilled({
    config: mockGranoDidConfig,
  })
  const wasmPath = './wasm/did_contract.wasm'
  const result = await granoDidClient.upload(wasmPath)
  console.dir(result, { depth: null })
}

main()

