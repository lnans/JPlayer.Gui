<template>
    <div id="breadcrumb">
        {{ routeName }}
    </div>
</template>

<script>
export default {
    name: 'BreadCrumb',
    data() {
        return {
            routeName: null,
        };
    },
    mounted () {
        this.routeName = this.$t(`routes.${this.$route.name}`)
    },
    watch: {
        '$route': 'currentRoute'
    },
    methods: {
        currentRoute() {
            this.$nextTick(() => {
                this.routeName = this.$t(`routes.${this.$route.name}`)
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#breadcrumb {
    font-weight: 600;
}
</style>
