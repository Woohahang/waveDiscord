// state.js

let state = {
    aliasTemplate: [],
    aliasSeparator: ''
};

const getState = () => state;

const setState = (newState) => {
    state = { ...state, ...newState };
};

module.exports = {
    getState,
    setState
};