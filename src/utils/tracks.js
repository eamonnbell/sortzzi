import trie from 'trie-prefix-tree'
import _ from 'lodash'

function getGroups(track, someTrie, tracks){
    var lowerTracks = tracks.map(s => s.toLowerCase());

    var chars = track.split('');

    var lastSeen = [];
    var groups = [];

    for(var i = 0; i < chars.length; i++){
        var partial = chars.slice(0, chars.length - i).join('');
        var prefixes = someTrie.getPrefix(partial);

        if (!_.isEqual(prefixes, lastSeen)) {
            lastSeen = prefixes.slice();
            var indices = prefixes.map((el) => lowerTracks.indexOf(el));
            // exclude "trivial" groups
            if(indices.length !== 1 && indices.length !== lowerTracks.length)
                groups.push({i, indices});               
        }
    } 

    return groups;
}

export function groupTracks (tracks) {
    var lowerTracks = tracks.map(s => s.toLowerCase());

    var myTrie = trie(lowerTracks);
    var result = {};
    
    lowerTracks.forEach((track, index) => {
        result[index] = {track: tracks[index]};
        result[index].groups = getGroups(track, myTrie, tracks);
    });

    return result;
}

export function wat() {
    return 'lol';
}
