pragma solidity ^0.4.4;
contract Colonizer {

  enum HabitantState { offline, online, archieved }
  enum AssetType { Residential, Industrial, Agricultural, Community, Other }

  struct Habitant {

    string fullName;
    string username;
    HabitantState status;
    bytes32 passwordhash;
    string colony;

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
  modifier habitantOnline() { require(habitantsStorage[msg.sender].status == HabitantState.online);_; }
  modifier assetValid(bytes32 _id) { require(assetsStorage[_id].valid);_; }
  modifier isAssetOwner(bytes32 _id) { require(assetsStorage[_id].owner == msg.sender);_; }

  function registerHabitant (string fullname, string username, string password, string colony) public {
    bytes32 passwordhash = keccak256(username, password);

    habitantsStorage[msg.sender] = Habitant(fullname, username, HabitantState.online, passwordhash, colony, new address[](0));
  }

  function deRegister (string username, string password) public {
    bytes32 passwordhash = keccak256(username, password);

    Habitant storage habitant = habitantsStorage[msg.sender];
    if (habitant.passwordhash == passwordhash) {
      habitant.status = HabitantState.archieved;
    }
  }

  function getCurrentState () public view returns (HabitantState) {
    return habitantsStorage[msg.sender].status;
  }

  function registerAsset(uint256 _value, string _description, uint256 _assetType, string _longitude, string _latitude)
  public habitantOnline {
    var assetId = keccak256(_assetType, _longitude, _latitude);

    AssetType assetType = AssetType.Other;
    if (_assetType == 0) { assetType = AssetType.Residential; }
    else if (_assetType == 1) { assetType = AssetType.Industrial; }
    else if (_assetType == 2) { assetType = AssetType.Agricultural; }
    else if (_assetType == 3) { assetType = AssetType.Community; }

    assetsStorage[assetId] = Asset({
      owner: msg.sender,
      value: _value,
      valid: true,
      onSale: false,
      description: _description,
      assetType: assetType,
      longitude: _longitude,
      latitude: _latitude
    });

  }

  function buyAsset(bytes32 _assetId) public payable assetValid(_assetId) {
    Asset storage currentAsset = assetsStorage[_assetId];
    require(currentAsset.owner != msg.sender);
    require(currentAsset.onSale);
    require(msg.value >= currentAsset.value);

    currentAsset.owner.transfer(msg.value);

    currentAsset.owner = msg.sender;
    currentAsset.onSale = false;
  }

  function sellAsset(bytes32 _assetId, uint256 _value) public assetValid(_assetId) isAssetOwner(_assetId) {
    Asset storage currentAsset = assetsStorage[_assetId];

    require(currentAsset.owner == msg.sender);
    currentAsset.onSale = true;
    currentAsset.value = _value;
  }

  function delistAsset(bytes32 _assetId) public assetValid(_assetId) isAssetOwner(_assetId) {
    assetsStorage[_assetId].onSale = false;
  }

}
