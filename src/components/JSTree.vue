<template>
    <div id="js-tree">
    </div>
</template>
<script>
export default {
    name: 'jstree',
    props: ['treeData'],
    watch: {
        treeData: function(value) {
            var vm = this;
            $(this.$el)
                .on('changed.jstree', function(e, data) {
                    vm.$emit('ChangedJsTree', e, data);
                })
                .jstree({
                    'core': {
                        'themes': {
                            'name': 'proton',
                            'responsive': 'true'
                        },
                        'data': value
                    },
                    'plugins': ['checkbox', 'changed', 'sort'],
                    'sort': function(a, b){
                        var nodeA = this.get_node(a);
                        var nodeB = this.get_node(b);

                        var getDiscTrackIndex = function(n){
                            return Number(n.original.discNumber) * 1000 + Number(n.original.trackNumber)
                        }

                        return getDiscTrackIndex(nodeA) > getDiscTrackIndex(nodeB);

                    }
                })
        }
    },
    destroyed() {
        $(this.$el).jstree.destroy();
    }
}
</script>

<style>

</style>
