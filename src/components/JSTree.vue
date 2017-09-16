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
            $(this.$el).jstree({
                'core': {
                    'themes':{
                        'name': 'proton',
                        'responsive': 'true'
                    },
                    'data': value
                },
                'plugins':['checkbox']
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
