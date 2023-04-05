// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

    /* ========== 自定义错误 ========== */
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // 用于initializer，确认是否已运行
    /////////////////////////////////////////////////////////////////////////////////////////////////////
error OnceOnly();

contract IterableMapping_V2 {
    /* ========== 全局参数 ========== */
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // VERSION代表合约代码版本
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    uint256 public constant VERSION = 2;

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // 函数initialize参数
    // isInitialized确认initialize是否已被调用，initValue设置初始数值
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    bool public isInitialized;
    uint256 public initValue;

    // Iterable mapping from address to uint;
    struct Mapping {
        address[] keys;
        mapping(address => uint) value;
        mapping(address => uint) index;
        mapping(address => bool) isInserted;
    }

    Mapping mapStruct;    
    uint256 public structSize;

    /* ========== 函数修改器 ========== */
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // 控制函数只运行一次
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    modifier initializer() {
        if (isInitialized) revert OnceOnly();
        _;
        isInitialized = true;
    }

    /* ========== 初始函数 ========== */
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // 只运行一次（代替原本的构造函数）
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    function initialize(uint256 _initValue) public initializer {
        initValue = _initValue;
    }

    /* ========== 功能函数 ========== */
    function getKeyByIndex(uint _index) public view returns (address) {
        return mapStruct.keys[_index];
    }

    function getValueByKey(address _key) public view returns (uint) {
        return mapStruct.value[_key];
    }

    function getIndexByKey(address _key) public view returns (uint) {
        return mapStruct.index[_key];
    }

    function getValueByIndex(uint _index) public view returns (uint) {
        return mapStruct.value[getKeyByIndex(_index)];
    }

    function size() public returns (uint) {
        structSize = mapStruct.keys.length;
        return structSize;
    }

    function set(address _key, uint _val) public {
        if (mapStruct.isInserted[_key]) {
            mapStruct.value[_key] = _val;
        } else {
            mapStruct.isInserted[_key] = true;
            mapStruct.value[_key] = _val;
            mapStruct.index[_key] = size();
            mapStruct.keys.push(_key);
        }
    }

    function remove(address _key) public {
        if (!mapStruct.isInserted[_key]) {
            return;
        }

        uint _index = mapStruct.index[_key];
        uint _lastIndex = size() - 1;
        address _lastKey = mapStruct.keys[_lastIndex];

        mapStruct.index[_lastKey] = _index;
        delete mapStruct.value[_key];
        delete mapStruct.index[_key];
        delete mapStruct.isInserted[_key];
        mapStruct.keys[_index] = _lastKey;
        mapStruct.keys.pop();
    }

    function initializeStruct() public {
        // 对 mapStruct 赋值
        set(address(10), 66666);
        set(address(11), 33333);
        set(address(12), 77777);
        set(address(13), 11111);
        set(address(14), 55555);
        set(address(15), 44444);
        set(address(16), 88888);
        set(address(17), 22222);
    }
}