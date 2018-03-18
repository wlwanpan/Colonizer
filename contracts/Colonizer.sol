pragma solidity ^0.4.4;
contract Colonizer {

  enum HabitantState { offline, online, archieved }
  enum AssetType { Residential, Industrial, Agricultural, Community, Other }

  struct Habitant {

    string fullName;
    string username;
    HabitantState status;
    bytes32 passwordhash;
    uint256 penaltyScore;
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

  struct ColonyLaw {

    uint256 penalty;

    string description;
    string colony;

  }

  uint256 public assetCount;
  uint256 public habitantCount;
  uint256 public colonyLawCount;

  bytes32[] colonyLawKeys;
  bytes32[] assetKeys;
  address[] habitantKeys;

  // Mapping Storage
  mapping (bytes32 => ColonyLaw) colonylawStorage; //
  mapping (bytes32 => Asset) assetsStorage; // store assetsStorage registered
  mapping (address => Habitant) habitantsStorage; // store user by address

  // Function Modifiers
  modifier habitantOnline() { require(habitantsStorage[msg.sender].status == HabitantState.online);_; }
  modifier assetValid(bytes32 _id) { require(assetsStorage[_id].valid);_; }
  modifier isAssetOwner(bytes32 _id) { require(assetsStorage[_id].owner == msg.sender);_; }

  function getMyDetails() public view habitantOnline
  returns(string fullName, string username, uint256 penaltyScore, string colony)
  {
    Habitant memory habitant = habitantsStorage[msg.sender];
    return(habitant.fullName, habitant.username, habitant.penaltyScore, habitant.colony);
  }

  function registerHabitant (string fullname, string username, string password, string colony) public {
    bytes32 passwordhash = keccak256(username, password);

    habitantsStorage[msg.sender] = Habitant(fullname, username, HabitantState.online, passwordhash, 0, colony, new address[](0));
    habitantKeys.push(msg.sender);

    habitantCount++;
  }

  function deRegister (string username, string password) public {
    bytes32 passwordhash = keccak256(username, password);

    Habitant storage habitant = habitantsStorage[msg.sender];
    if (habitant.passwordhash == passwordhash) {
      habitant.status = HabitantState.archieved;
    }

    habitantCount--;
  }

  function getHabitantByIndex(uint256 _index) public view returns(string fullname, uint256 penaltyScore, string colony) {
    require(_index >= 0 && _index < habitantKeys.length);
    address _key = habitantKeys[_index];
    Habitant memory habitant = habitantsStorage[_key];

    return(habitant.fullName, habitant.penaltyScore, habitant.colony);
  }

  function getCurrentState () public view returns (HabitantState) {
    return habitantsStorage[msg.sender].status;
  }

//-- Private Helper Functions for Asset -- //
  function getAssetTypeFromIndex(uint256 _index) pure private returns (AssetType) {
    if (_index == 0) { return AssetType.Residential; }
    else if (_index == 1) { return AssetType.Industrial; }
    else if (_index == 2) { return AssetType.Agricultural; }
    else if (_index == 3) { return AssetType.Community; }
    else { return AssetType.Other; }
  }

  function convertAssetTypeToString(AssetType _type) pure private returns (string) {
    if (_type == AssetType.Residential) return('Residential');
    else if (_type == AssetType.Industrial) return('Industrial');
    else if (_type == AssetType.Agricultural) return('Agricultural');
    else if (_type == AssetType.Community) return('Community');
    else return('Other');
  }
//-- end --//

  function registerAsset(uint256 _value, string _description, uint256 _assetType, string _longitude, string _latitude)
  public habitantOnline {
    var assetId = keccak256(_assetType, _longitude, _latitude);

    AssetType assetType = getAssetTypeFromIndex(_assetType);

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

    assetKeys.push(assetId);
    assetCount++;
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

  function getAssetByIndex(uint256 _index) public view returns(
    bytes32 assetId, string ownerUsername, string colony, uint256 value, bool onSale,
    string assetType, string description, string longitude, string latitude
  ){
    require(_index >= 0 && _index < assetKeys.length);
    bytes32 _key = assetKeys[_index];
    Asset memory asset = assetsStorage[_key];
    Habitant memory owner = habitantsStorage[asset.owner];

    return(
      _key, owner.username, owner.colony, asset.value, asset.onSale,
      convertAssetTypeToString(asset.assetType), asset.description, asset.longitude, asset.latitude
    );
  }

}
