// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.22;

contract Bid{
    
   struct Data{
      bool status;
      bytes32 hash;
   }

   mapping(string => Data) private data;

   function setData(string memory _bidHistoryId, bytes32 _hash) public {
     Data memory newData = Data({status: true, hash: _hash});        
     data[_bidHistoryId] = newData;
   }
         
   function getData(string memory _bidHistoryId) view public returns(bool, bytes32) {                     
      return (data[_bidHistoryId].status, data[_bidHistoryId].hash);
   } 

}
