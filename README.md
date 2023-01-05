# grano-did-client

## How to Use
0. Start [grano did node](https://github.com/EG-easy/grano-did-node).

1. Set grano did node access configuration in `.env`
```env
END_POINT='http://localhost:26657'
DENOM='ugrano'
MNEMONIC='estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic'
PREFIX='grano'
FROM_ADDRESS='grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'

CONTRACT_ADDRESS='grano1cefw8elvkj8t63k5ea2mlpkgyxgjlw2g4vw5l7j3txu925ug9ffskc6vhc'
```

2. Call Client
```index.js
const { GranoDidClient } = require('@eg-easy/grano-did-client')

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
- https://github.com/eg-easy/grano-did
- https://github.com/EG-easy/grano-did-contract
- https://github.com/EG-easy/grano-did-exporter
- https://github.com/EG-easy/grano-did-node
- https://github.com/EG-easy/grano-did-resolver
