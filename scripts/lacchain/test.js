import { config } from '../../config/config.js';
import path from "path"

function main(){
	
	if(process.argv.length != 3){
		console.log("");
        console.log("Enter contract name");
        console.log("Add <contractName>");        
        console.log("");
        return
	}

	const contractName = process.argv[2]
	
}


main()

