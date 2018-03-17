pragma solidity ^0.4.18;
contract Colonizer {

  enum HabitantState { offline, online, archieved }
  enum AssetType { Residential, Industrial, Agricultural, Community }

  struct Habitant {

    string fullName;
    string username;
    HabitantState status;
    bytes32 passwordhash;
    string colony;

    bytes32[] assetsStorage;
    address[] relatives;
  }

  struct Asset {
    address owner;

    uint256 value;

    bool valid;
    bool onSale;

    AssetType assetType;

    string description;
    string longitude;
    string latitude;
  }

  // Mapping Storage
  mapping (bytes32 => Asset) assetsStorage; // store assetsStorage registered
  mapping (address => Habitant) habitantsStorage; // store user by address

  // Function Modifiers
  modifier habitantValid() { require(true);_; }
  modifier assetValid(bytes32 _id) { require(assetsStorage[_id].valid);_; }

  function registerHabitant (string fullname, string username, string password, string colony) public {
    bytes32 passwordhash = keccak256(username, password);

    Habitant memory newHabitant = Habitant(fullname, username, HabitantState.online, passwordhash, colony, new bytes32[](0), new address[](0));
    habitantsStorage[msg.sender] = newHabitant;
  }

  function deRegister (string username, string password) public {
    bytes32 passwordhash = keccak256(username, password);

    Habitant storage habitant = habitantsStorage[msg.sender];
    if (habitant.passwordhash == passwordhash) {
      habitant.status = HabitantState.archieved;
    }
  }

  function getCurrentState () public constant returns (HabitantState) {
    Habitant storage habitant = habitantsStorage[msg.sender];
    return habitant.status;
  }

  function updateAssetValue(bytes32 _assetId, uint256 _value) public habitantValid returns(bool status) {
    Asset storage currentAsset = assetsStorage[_assetId];
    require(currentAsset.owner == msg.sender);
    currentAsset.value = _value;
    return(true);
  }

  function registerAsset(uint256 _value, string _description, string _assetType, string _longitude, string _latitude)
  public habitantValid {
    var assetId = keccak256(_assetType, _longitude, _latitude);

    AssetType //{ Residential, Industrial, Agricultural, Community }
    if (_assetType == 'Residential') {

    }
    else if (_assetType == Industrial) {

    }
    else if (_assetType == Agricultural) {

    }
    else if ()

    assetsStorage[assetId] = Asset({
      owner: msg.sender,
      value: _value,
      valid: true,
      onSale: false,
      description: _description,
      assetType: _assetType,
      longitude: _longitude,
      latitude: _latitude
    });

  }

  function buyAsset(bytes32 _assetId) public payable habitantValid assetValid(_assetId) {
    Asset storage currentAsset = assetsStorage[_assetId];
    require(msg.value == currentAsset.value);
    require(currentAsset.onSale);

    currentAsset.owner.transfer(msg.value);
    currentAsset.owner = msg.sender;
    currentAsset.onSale = false;
  }

  /* function sellAsset(bytes32 _assetId) public habitantValid assetValid(_assetId) {
    Asset storage currentAsset = assetsStorage[_assetId];
  } */

}
