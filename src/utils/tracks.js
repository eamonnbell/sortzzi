var nanoid = require('nanoid')

function pseudoUUID() {
    return nanoid(8);
}

// https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0

// we start with the TrieNode
function TrieNode(key) {
    // the "key" value will be the character in sequence
    this.key = key;
    this.value = key;
    // we keep a reference to parent
    this.parent = null;
    // we have hash of children, keyed on key
    this.children = {};
    // check to see if the node is at the end
    this.end = false;
    // id is used with JS tree
    // nodes will be labeled with the value property
    this.id = pseudoUUID();
}


TrieNode.prototype.getWord = function () {
    var output = [];
    var node = this;

    while (node !== null) {
        output.unshift(node.key);
        node = node.parent;
    }

    return output;
};

TrieNode.prototype.countChildren = function () {
    return Object.keys(this.children).length;
};

function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.insert = function (word, trackIndex, track) {
    var node = this.root;

    // for every character in the word
    for (var i = 0; i < word.length; i++) {
        // check to see if character node exists in children.
        if (!node.children[word[i]]) {
            // if it doesn't exist, we then create it.
            node.children[word[i]] = new TrieNode(word[i]);
            // we also assign the parent to the child node.
            node.children[word[i]].parent = node;
        }

        // proceed to the next depth in the trie.
        node = node.children[word[i]];

        // finally, we check to see if it's the last word.
        if (i == word.length - 1) {
            // if it is, we set the end flag to true.
            node.end = true;
            
            node.trackIndex = trackIndex;
            node.trackId = track.id;
            node.discNumber = track.disc_number;
            node.trackNumber = track.track_number;
        }
    }
};

// check if it contains a whole word.
Trie.prototype.contains = function (word) {
    var node = this.root;

    // for every character in the word
    for (var i = 0; i < word.length; i++) {
        // check to see if character node exists in children.
        if (node.children[word[i]]) {
            // if it exists, proceed to the next depth of the trie.
            node = node.children[word[i]];
        } else {
            // doesn't exist, return false since it's not a valid word.
            return false;
        }
    }

    // we finished going through all the words, but is it a whole word?
    return node.end;
};

// returns every word with given prefix
Trie.prototype.find = function (prefix) {
    var node = this.root;
    var output = [];

    // for every character in the prefix
    for (var i = 0; i < prefix.length; i++) {
        // make sure prefix actually has words
        if (node.children[prefix[i]]) {
            node = node.children[prefix[i]];
        } else {
            // there's none. just return it.
            return output;
        }
    }

    // recursively find all words in the node
    findAllWords(node, output);

    return output;
};

Trie.prototype.traverseBreadthFirst = function (callback) {
    var q = [];
    q.push(this.root);

    var currentTree = q.shift();

    while (currentTree) {
        for (var child in currentTree.children) {
            if (currentTree.children.hasOwnProperty(child))
                q.push(currentTree.children[child]);
        }

        callback(currentTree);
        currentTree = q.shift();
    }
};

Trie.prototype.traverseDepthFirst = function (callback) {
    (function recurse(currentNode) {
        for (var child in currentNode.children) {
            recurse(currentNode.children[child]);
        }
        callback(currentNode);
    })(this.root);
};

Trie.prototype.mergeNames = function () {
    this.traverseBreadthFirst((n) => {
        if (n.countChildren() == 1 && n != this.root) {
            var child = Object.values(n.children)[0];
            child.value = n.value + ' ' + child.value;
            child.parent = n.parent;
        }
    });
};

Trie.prototype.getNodes = function () {
    var trieNodes = [];

    this.traverseBreadthFirst((n) => {
        var o = {};

        if (n.countChildren() < 2 && !n.end && n !== this.root) {
            return
        }

        if (n.parent === null) {
            return
        } else {
            o.text = n.value;
            o.parent = n.parent == this.root ? '#' : n.parent.id;
            o.id = n.id;

            if (n.end) {
                o.text = n.value + ` (Track ${n.trackNumber})`;                
                o.trackId = n.trackId;
                o.discNumber = n.discNumber;
                o.trackNumber = n.trackNumber;
                o.a_attr = {};
                o.a_attr.href = `//open.spotify.com/track/${o.trackId}`;
            } 
        }

        o.state = {}
        o.state.opened = true;

        trieNodes.push(o);
    });

    return trieNodes;
};

// recursive function to find all words in the given node.
function findAllWords(node, arr) {
    // base case, if node is at a word, push to output
    if (node.end) {
        arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (var child in node.children) {
        findAllWords(node.children[child], arr);
    }
}

// bulid trie from list of tracks
export function buildTrieFromTracks(tracks) {
    var T = new Trie();

    // build trie
    tracks.forEach((track, trackIndex) => {
        // magic
        var trackReplaced = track.name.replace(/(,|no\.|\.|:)/gi, ' ');
        var word = trackReplaced.split(/\s+/);

        T.insert(word, trackIndex, track);
    });

    T.mergeNames();
    return T.getNodes();
}

