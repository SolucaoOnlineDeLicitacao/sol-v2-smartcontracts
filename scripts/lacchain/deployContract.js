import fs from "fs";
import path from "path";
import { ethers } from "ethers";
import lacnet from "@lacchain/gas-model-provider";
import { config } from '../../config/config.js';

const provider = new lacnet.GasModelProvider( config.LACCHAIN_PROVIDER );
const privateKey = config.LACCHAIN_PRIVATE_KEY;
const nodeAddress = config.LACCHAIN_NODE_ADDRESS;
const expiration = config.LACCHAIN_EXPIRATION;
const signer = new lacnet.GasModelSigner( privateKey, provider, nodeAddress, expiration );


if(process.argv.length != 3){
	console.log("");
    console.log("Enter contract name");
    console.log("Add <contractName>");        
    console.log("");
    process.exit(0)
}

const contractName = process.argv[2]

const deployStorage = async() => {

	try{

		const StorageBuild = fs.readFileSync(`artifacts/contracts/${contractName}.sol/${contractName}.json` );
		const StorageJSON = JSON.parse( StorageBuild.toString() );
		const Storage = new ethers.ContractFactory( StorageJSON.abi, StorageJSON.bytecode, signer );
		const contract = await Storage.deploy( { gasLimit: 1000000, gasPrice: 0 } );
		const receipt = await contract.deployTransaction.wait();
		const contractAddress = receipt.contractAddress;
		console.log( 'Storage address:', contractAddress );
	}catch(e){
		console.log(e)
	}
}

deployStorage().catch( console.error );