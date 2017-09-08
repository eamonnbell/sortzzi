<template>
<div>
    {{ query }}
    <ul>
        <li v-for="result in results" v-bind:key="result.id">
            {{ result.name }} -- {{ result.age}}
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'searchresults',
    props: ['query'],
    data() {
        return {
            results: [
                {
                    id: 12,
                    'name': 'Eamonn',
                    'age': 42,
                },
                {
                    id: 13,
                    'name': 'Bell',
                    'age': 24,
                }
            ]
        }
    }
}
</script>

<style>

</style>
