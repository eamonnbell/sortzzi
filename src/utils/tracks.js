var trie = require('trie-prefix-tree');
var _ = require('lodash');

function tracksToGroupedTracks(tracks) {
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

    var lowerTracks = tracks.map(s => s.toLowerCase())
    var myTrie = trie(lowerTracks);
    var result = {};
    
    lowerTracks.forEach((track, index) => {
        result[index] = {track: tracks[index]};
        result[index].groups = getGroups(track, myTrie);
    });

    return result;
}