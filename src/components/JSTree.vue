<template>
    <div id="js-tree"></div>
</template>
<script>
export default {
    name: 'jstree',
    props: ['treeData'],
    watch: {
        treeData: function(value) {
            var vm = this;
            $(this.$el)
                .on('changed.jstree', function(e, data){
                    vm.$emit('ChangedJsTree', e, data);
                })
                .jstree({
                    'core': {
                        'themes':{
                            'name': 'proton',
                            'responsive': 'true'
                        },
                        'data': value
                    },
                    'plugins':['checkbox', 'changed']
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
