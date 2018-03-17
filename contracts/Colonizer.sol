pragma solidity ^0.4.18;
contract Colonizer {

  enum HabitantState { offline, online, archieved }

  struct Habitant {

    string fullName;
    string username;
    HabitantState status;
    bytes32 passwordhash;
    string colony;

    bytes32[] assets;
    address[] relatives;
  }

  struct Asset {

    string description;
    // string type;
    bytes32 longitude;
    bytes32 latitude;
    bytes32 id;
  }

  mapping (bytes32 => Asset) assetsStorage; // store assets registered
  mapping (bytes32 => Habitant) habitantsStorage; // store user by address

  function registerHabitant (string fullname, string username, string password, string colony) public {

    bytes32 passwordhash = keccak256(username, password);
    bytes32 senderAddrHash = keccak256(msg.sender);

    Habitant memory newHabitant = Habitant(fullname, username, HabitantState.online, passwordhash, colony, new bytes32[](0), new address[](0));
    habitantsStorage[senderAddrHash] = newHabitant;
  }

  function deRegister (string username, string password) public {
    bytes32 passwordhash = keccak256(username, password);    
    bytes32 senderAddrHash = keccak256(msg.sender);

    Habitant storage habitant = habitantsStorage[senderAddrHash];
    if (habitant.passwordhash == passwordhash)
      habitant.status = HabitantState.archieved;
  }

  function getCurrentState () public constant returns (HabitantState) {
    bytes32 senderAddrHash = keccak256(msg.sender);
    Habitant storage habitant = habitantsStorage[senderAddrHash];
    return habitant.status;
  }

}