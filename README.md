# Grano DID Client
Grano DID Client is a client library to interact with [grano-did-contract](https://github.com/intellltech/grano-did-contract). It wraps [CosmJS](https://github.com/cosmos/cosmjs) client library.

## How to Use
0. Start [grano did node](https://github.com/intellltech/grano-did-node) with [grano-did-contract](https://github.com/intellltech/grano-did-contract) is deployed.

1. Set grano did node access configuration in `.env`
```env
END_POINT='http://localhost:26657'
DENOM='ugrano'
MNEMONIC='estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic'
PREFIX='grano'
FROM_ADDRESS='grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
```

2. Call Client
```index.js
const { GranoDidClient } = require('@intellltech/grano-did-client')

const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled()

  const controllerParams = {
    contractAddress: 'grano1cefw8elvkj8t63k5ea2mlpkgyxgjlw2g4vw5l7j3txu925ug9ffskc6vhc',
    identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
  }
  const queryControllerResult = await granoDidClient.controller(controllerParams)

  console.dir(queryControllerResult, { depth: null })
}

main()
```

Please check [trials](./trials) folder to know more examples about how to interact with the grano did node.

## Sample Response
```js
{ controller: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev' }
```

## References
- https://github.com/intellltech/grano-did
- https://github.com/intellltech/grano-did-contract
- https://github.com/intellltech/grano-did-exporter
- https://github.com/intellltech/grano-did-node
- https://github.com/intellltech/grano-did-resolver
