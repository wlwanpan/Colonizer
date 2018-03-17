pragma solidity ^0.4.18;

contract Colonizer {

  enum habitantState { online, offline, archieved }

  struct Habitant {

    string fullName;
    string username;
    habitantState status;
    bytes32 passwordhash;
    string colony;

    address[] assets;
    address[] relatives;

  }

  struct Asset {

    bytes32 id;
    string description;
    string assetType;
    bytes32 longitude;
    bytes32 latitude;

  }

  mapping (bytes32 => Asset) assets; // store assets registered
  mapping (address => Habitant) habitants; // store user by address

  function registerHabitant (string fullname, string username, string password, string colony) public {
    // register an account with from using struct above
  }

  function loginHabitant (string _username, string _password) public {
    // login account and increment online user count
  }

  function logoutHabitant () public {
    // louout and decrement online user count
  }

  function deRegister () public {

  }

}