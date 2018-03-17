
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

    string description;
    string type;
    bytes32 longitude;
    bytes32 latitude;

  }

  mapping (address => Asset) assets; // store assets registered
  mapping (address => Habitant) habitants; // store user by address

  function registerHabitant (string fullname, string username, string password, string colony) {
    // register an account with from using struct above
    msg.sender = address = Habitant()

    habitants[msg.sender] = Habitant()

  }

  function loginHabitant (string username, string password) {
    // login account and increment online user count
    bytes hash = keccab(username, password);

  }

  function logoutHabitant () {
    // louout and decrement online user count

  }

  function deRegister () {

  }

}