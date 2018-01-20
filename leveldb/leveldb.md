# The the cononical version of the Ethereum world aka the state

Ethereum is essentially a transaction-based "state" machine. The Ethereum blockchain begins life with a genesis state. You may remember the genesis block from other blockchain implementations such as bitcoin. From this point onwards, the state, or the cononical version of the Ethereum world, is continually altered. For example, account balances, which are stored in the state, change as transactions take place. 

The state is not stored in the blocks of the Ethereum blockchain. The state, at any given point in time, is actually stored on the file systems of each of the Ethereum nodes, which reside on the Ethereum network. The blocks function primarily as a journal; recording transactions and providing identifiers for the final state < http://gavwood.com/Paper.pdf >

Different Ethereum clients use different database software to store the state, of the Ethereum network, on the local disk of each node. For example, the Ethereum client Parity[1] uses rocksdb[2]. Whereas Ethereum's Go [3], C++ [4] and Python [5] clients all use leveldb [6].

# Ethereum and rocksdb

Rocksdb is out of scope for this post. This will be covered at a later date. For now let's explore how 3 of the 4 major Ethereum clients utilise leveldb.

# Ethereum and leveldb

LevelDB is an open source Google key-value storage library which provides, amongst other things, forward and backward iterations over data,  ordered mapping from string keys to string values, custom comparison functions and automatic compression [7]. The data is automatically compressed using “Snappy” an open source Google compression/decompression library. Whilst Snappy does not aim for maximum compression, it aims for very high speeds [8]. Leveldb is an important storage and retrieval mechanism which manages the state of the Ethereum network. As such, leveldb is a dependancy for the most popular Ethereum clients (nodes) such as go-ethereum, cpp-ethereum and 

So how does Ethereum utilise leveldb?

The aim of this post is to provide as much information, as possible, in relation to the use of leveldb within Ethereum. 
In this post we:
- begin by providing step by step instructions on how to prepare Ubuntu Linux (16.04LTS)
- provide justification for why you would use an Ethereum private network for testing (as apposed to the mainnet of testnets)
- configure and run Ethereum on our own private network
- configure and mine Ethereum on our own private network
- execute transactions and smart contracts on our private network
- dive into the blockchain state by exploring Ethereum's application data storage layer which resides in leveldb

# Installing Ethereum

## Housekeeping

`
sudo apt-get update
`

`
sudo apt-get upgrade
`

`
sudo apt-get install -y build-essential
`

## Installing Go

To get the package type

`
cd ~
`

`
wget https://dl.google.com/go/go1.9.2.linux-amd64.tar.gz
`

Verify the download by checking that the sha256sum results from the following command match that of the relevant sha256 checksum section on the < https://golang.org/dl/ > website

`
sha256sum go1.9.2.linux-amd64.tar.gz 
`

To unpack the package, type the following (using sudo)

`
sudo tar -C /usr/local -xzf go1.9.2.linux-amd64.tar.gz 
`

To ensure that the Go path is set for your user profile. Add the following line to the end of your ~/.profile file

`
export PATH="$PATH:/usr/local/go/bin"
`

Log out and in (or reboot) to ensure the environment variables have taken.
Test Go with the following command (confirm the version)

`
go version
`

The output should look like this

`
go version go1.9.2 linux/amd64
`

## Installing Git

`
sudo apt-get install git
`

## Fetching Geth

Change to home

`
cd ~
`

Fetch Geth

`
git clone https://github.com/ethereum/go-ethereum.git
`

### Mining difficulty

As this will be a private network, we do not want the Ethereum installation to constantly increase the difficulty setting. We are just performing some testing, in a closed and private network, and as such want the quickest mining time available.

To set the difficulty at 1 statically, we need to open the following file in the source code (before compiling)

`
go-ethereum/consensus/ethash/consensus.go
`

Once we have this file open for editing, we need to go to the calcDifficulty function (currently on line 298)

`
https://github.com/ethereum/go-ethereum/blob/02aeb3d76652a4c0451e5c3734e6881aefe46249/consensus/ethash/consensus.go#L298
`

This function controls which difficulty adjustment function is called. 

![default Ethereum consensus file](./images/consensus_before.png)

In order to gaurantee the lowest difficulty level (on an ongoing basis), we will need to strip out the case statement and simply return big.NewInt(1) for the entire function's excecution

`
return big.NewInt(1)
`

![modified Ethereum consensus file](./images/consensus_after.png)

Additional configuration and commands are required in relation to accounts, networks and configuration. 

Please hold off running any commands until reading the next few paragraphs.

# Explaining Ethereum networks

## Main network

For peer-to-peer nodes to interact on the same network they have to have the identical protocol version and the right network ID. In order for peer nodes to connect to the main Ethereum network, nothing extra is required; simply starting the Ethereum software will suffice. From an experimental, testing perspective there are two main drawbacks to using the main Ethereum network. Firstly, of course starting Ethereum with the default network settings will result in your peer node downloading the entire Ethereum blockchain. This takes a significant amount of time and requires a lot of storage on your local disk. Secondly any activity on the main Ethereum network requires “gas”. Whilst this gas is obtainable, it involves purchasing and depositing ETH into your account. You may not want to do this just for experimental testing.

## Test network

There are other ways to start your Ethereum node. You may want to use an Ethereum test network like Ropsten as this will provide the flexibility to participate on the network without purchasing ETH. Testnet ETH can be obtained without having to pay real money. This solves one problem, however using a testnet like Ropsten also requires you to download the Ropsten testnet blockchain. This again, takes time and requires local disk space.

## Private network

One final alternative is to run a private network. A private network requires negligible local disk storage and can be operated without having to purchase ETH with real money. So what constitutes a private Ethereum network?

“An Ethereum network is a private network if the nodes are not connected to the main network nodes. In this context private only means reserved or isolated, rather than protected or secure.”[9]

As mentioned on the Ethereum GitHub page a private network is neither protected or secure. In addition, setting up a private network requires a little bit of extra configuration. You can alleviate the security aspect by simply running the private Ethereum network behind a properly configured firewall. With security aside, all that is left if to perform is the extra configuration.

# Running a private Ethereum network

## Network ID

The network ID for the main Ethereum network is 1. If started in default mode, the code will automatically connect to the main Ethereum network by default.

Alternatively, the network ID can be passed into the command line when starting Go Ethereum code, using the following flag.
— networkid (dash, dash, space, networkid)

Obviously, in order to keep other nodes from connecting to your private Ethereum test network it would be in your best interests to a) secure the network using a properly configured filewall and b) choose a unique network ID

## Account

In a moment we will be using a once off mechanism to fund our account. Before we use that mechanism we need to create create a data directory for Ethereum, create our new accounts and save those account details for use on future steps. 
Create an Ethereum data directory by typing the following

`
cd ~
`

`
mkdir gethDataDir
`

This can be done by typing the following command.

`
geth account new --datadir ~/gethDataDir
`

The output from the above command will produce a public account address (after you provide a password). Record and save this address for later use.

`
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {77fd1acbd74fab8dc821fe5c88598c7b4b906fd4}
`

**It is recommended that you do this twice, that way you will have to addresses which you can send ETH back and forth to**

## Genesis block

When running Ethereum for the first time, if the default settings are used, the blockchain will start at the "hard coded" genesis block (first block in the public main net blockchain). From this point onwards the code will find peers and synchonise until the Ethereum instance which you are running is up to date. Being synchronised, or up to date, means that you are storing everything from the genesis block, right up, to the most recent block, locally. Ethereum's blockchain is almost 45GB in size and so for our purpose of testing this is not desirable.

Instead, we can create our own genesis block. This must be done before starting Ethereum. 

## Create genesis.json

Create a file such as below, and save it with the name "genesis.json" into the ~/gethDataDir directory.

**Note** the "alloc" section where we paste in the two account addresses from above.
**Note** the "chainId" section which is set to 15 (and not 1). If you remember, above in the **Network ID** section, 1 is the main Ethereum network.

`
{
    "config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "1",
    "gasLimit": "2100000",
    "alloc": {
        "77fd1acbd74fab8dc821fe5c88598c7b4b906fd4": { "balance": "300000" },
        "b7714bd73152a27939914c644fb7471966378626": { "balance": "400000" }
    }
}
`

## Initialize the blockchain 

Type the following initialisation command, which references the genesis and its settings

`
geth --datadir ~/gethDataDir init genesis.json
`

## Starting Ethereum

Type the following command to start Ethereum. Please note that the networkid is the same as the "chainId" in the genesis.json file

`
geth --datadir ~/gethDataDir --networkid 15
`

## Starting the console

Open a new terminal and type the following command so that we can use the Geth Javascript API

`
geth attach ipc:gethDataDir/geth.ipc 
`

![console picture](./images/console.png)

## Using the console

The following command will list the Ethereum accounts which we recently created

`
eth.accounts
`

![console picture](./images/accounts.png)

The following commands will list details about your:
- account balances
- coinbase address (where the mining rewards are sent)
- mining status (true/false)

![console picture](./images/console_status.png)


# Analysing the Ethereum database

## Installing npm, node and level

We will be using nodejs and level to inspect the leveldb database.

With reference to the following site https://github.com/nodesource/distributions to install nodejs and npm please use the following commands

`
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
`

`
sudo apt-get install nodejs
`

Verify the installations by typing the following commands
For npm

`
npm -v
`

For nodejs

`
nodejs -v
`

To install level, please use the following command

`
npm install level
`

## Working with the data

Start a nodejs console by typing

`
nodejs
`

Import the level library into the console session

`
var level = require('level')
`

Set the database variable to the root directory of the Ethereum database

`
var db = level('/home/timothymccallum/gethDataDir/geth/chaindata')
`

Set the genesis state root

`
var genesis_state_root = '0xe403429877a3fd13eb3da17503af458dd0741ec3b617f2eaf2338ca945edb0e2';
`
continue on from here Tim 
https://ethereum.stackexchange.com/questions/31628/how-open-local-ethereum-chain-leveldb-using-nodejs-levelup-package







# References

[1] https://github.com/paritytech/parity
[2] https://github.com/facebook/rocksdb
[3] https://github.com/ethereum/go-ethereum
[4] https://github.com/ethereum/cpp-ethereum
[5] https://github.com/ethereum/pyethereum
[6] https://github.com/google/leveldb
[7] https://github.com/google/leveldb
[8] https://github.com/google/leveldb 
[9] https://github.com/ethereum/go-ethereum/wiki/Private-network
Reference < http://gavwood.com/Paper.pdf >


# TODO READ
- https://github.com/ethereum/pyethereum This link has a breakdown of the state in the README file
- https://github.com/ethereum/pyethereum/blob/6d4d3e0da8323d32178d8ff1360a204ec2115424/ethereum/todo_tests/tst_frontier.py File which actually accesses the leveldb
- https://github.com/ethereum/cpp-ethereum/blob/116d37f7e6c2a70f82aa1830b12e2a9591ca8e3f/doc/database_layout.rst As listed below in [a], this link has information about the database layout
- https://ethereum.stackexchange.com/questions/31628/how-open-local-ethereum-chain-leveldb-using-nodejs-levelup-package This has info about using node to access database
- https://wanderer.github.io/ethereum/nodejs/code/2014/05/21/using-ethereums-tries-with-node/ Again information about node
- https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/ A really good explaination of state and leveldb
- htps://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP RLP encryption
- https://github.com/Level/level Level commands


# [a] START This is the database layout for C++ Ethereum, this might come in handy for directions in navigating the database via node

USE THIS AS A REFERENCE - this is C++ specific and we are using go now, make sure that the architecture is the same and if not report on this as part of the work
* Blocks - {ETH_DATABASE_DIR}/{GENESIS_HASH}/blocks
* Extras - {ETH_DATABASE_DIR}/{GENESIS_HASH}/{DATABASE_VERSION}/extras
* State - {ETH_DATABASE_DIR}/{GENESIS_HASH}/{DATABASE_VERSION}/state
SOURCE:https://github.com/ethereum/cpp-ethereum/blob/116d37f7e6c2a70f82aa1830b12e2a9591ca8e3f/doc/database_layout.rst

# [a] END
