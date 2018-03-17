
contract Colonizer {

  struct Habitant {

    string fullName;
    bytes32 passwordhash;
    string colony;
    address[] assets;

  }

  struct Asset {

    string description;
    string type;
    bytes32 longitude;
    bytes32 latitude;

  }

  mapping (address => Asset) assets; // store assets registered
  mapping (address => Habitant) habitants; // store user by address

  function registerHabitant () {
    // register an account with from using struct above
  }

  function loginHabitant () {
    // login account and increment online user count

  }

  function logoutHabitant () {
    // louout and decrement online user count

  }

}