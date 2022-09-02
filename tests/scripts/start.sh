#!/bin/bash

NETWORK=did-1
DAEMON=wasmd
HOME_DIR=~/.wasmd
CONFIG=~/.wasmd/config
TOKEN_DENOM=udid
MNEMONIC='estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic'

rm -rf $HOME_DIR

$DAEMON init $NETWORK --chain-id $NETWORK
echo $MNEMONIC | $DAEMON keys add eg --keyring-backend=test --recover
$DAEMON add-genesis-account $($DAEMON keys show eg -a --keyring-backend=test) 100000000000000$TOKEN_DENOM

sed -i "s/\"stake\"/\"$TOKEN_DENOM\"/g" $HOME_DIR/config/genesis.json

$DAEMON gentx eg 50000000000000$TOKEN_DENOM --chain-id=$NETWORK --commission-max-change-rate=0.1 --commission-max-rate=1 --commission-rate=0.1 --moniker=eg-validator --keyring-backend=test
$DAEMON collect-gentxs
$DAEMON validate-genesis

$DAEMON start
