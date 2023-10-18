const Uid = require('short-unique-id');

function UID(str) {
    const uid = new Uid({ length: 8, dictionary: 'number' });
    const id = str + uid.rnd();
    return id;
}

module.exports = UID;