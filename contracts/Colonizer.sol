
contract Colonizer {

  struct Habitant {

    string fullName;
    bytes32 passwordhash;
    string colony;
    address[] assets;

  }


  mapping (address => Habitant) habitants;


  function registerHabitant () {
    // register an account with from abocve ^
  }

  function loginHabitant () {

  }

  function logoutHabitant () {

  }

}