var trie = require('trie-prefix-tree');
var _ = require('lodash');

const tracks = ["Suite No.1 In D Minor, BWV 812: 1. Allemande",
"Suite No.1 In D Minor, BWV 812: 2. Courante",
"Suite No.1 In D Minor, BWV 812: 3a. Sarabande",
"Suite No.1 In D Minor, BWV 812: 3b. Sarabande (Variant)",
"Suite No.2 In C Minor, BWV 81300: 1. Allemande",
"Suite No.2 In C Minor, BWV 81300: 2. Courante",
"Suite No.2 In C Minor, BWV 81300: 3. Sarabande",
"Suite No.2 In C Minor, BWV 81300: 4. Air"];

var lowerTracks = tracks.map(s => s.toLowerCase())

var myTrie = trie(lowerTracks);

var result = {};

lowerTracks.forEach((track, index) => {
    result[index] = {track: tracks[index]};
    result[index].groups = getGroups(track, myTrie);
});

// console.log(result);

function getGroups(track, trie){
    var chars = track.split('');

    var lastSeen = [];

    groups = [];

    for(var i = 0; i < chars.length; i++){
        var partial = chars.slice(0, chars.length - i).join('');
        var prefixes = trie.getPrefix(partial);

        if (!_.isEqual(prefixes, lastSeen)) {
            lastSeen = prefixes.slice();
            var indices = prefixes.map((el) => lowerTracks.indexOf(el));
            // exclude "trivial" groups
            if(indices.length !== 1 && indices.length !== lowerTracks.length)
                groups.push({i, indices});               
        }
    } 

    return groups
}

console.log(result);