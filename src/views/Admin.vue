<template>
    <div id="administration">
        <v-card class="admin_cards" v-for="(tile, idx) in tiles" :key="idx">
            <v-card-title class="admin_cards--title">{{ tile.title }}</v-card-title>
            <v-card-text class="admin_cards--content">
                <div class="admin_cards--info">
                    <p class="cards--info-label">{{ tile.subTiltle }}</p>
                    <p class="cards--info-data">{{ tile.data }}</p>
                </div>
                <div class="admin_cards--icon"><v-icon size="40">{{ tile.icon }}</v-icon></div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Admin',
    data () {
        return {
            tiles: [
                {
                    title: 'Manage Users',
                    subTiltle: 'Total count',
                    data: '4',
                    icon: 'fa-users'
                },
                {
                    title: 'Manage Profiles',
                    subTiltle: 'Total count',
                    data: '4',
                    icon: 'fa-address-card'
                },
                {
                    title: 'Manage Functions',
                    subTiltle: 'Total count',
                    data: '4',
                    icon: 'fa-clipboard-list'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
#administration {
    overflow: auto;
    height: calc(100vh - 60px);
}
.admin_cards {
    display: block;
    background-color: $app-default-bg-color;
    float: left;
    width: 370px;
    height: 180px;
    margin: 30px 0 0 30px;
    cursor: pointer;
    p {
        margin: 0;
    }
    .admin_cards--title {
        color: $app-components-font-color;
        padding: 25px 30px 25px 30px;
        font-weight: 600;
        font-size: 20px;
    }
    .admin_cards--content {
        color: $app-components-font-color;
        padding: 15px 30px 0 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .admin_cards--info {
            display: flex;
            flex-direction: column;
            .cards--info-label {
                font-weight: 600;
                font-size: 14px;
            }
            .cards--info-data {
                font-weight: 400;
                font-size: 40px;
                line-height: 40px;
            }
        }
        .admin_cards--icon {
            align-self: flex-end;
            .v-icon {
                color: $app-components-font-color;
            }
        }
    }
}
</style>
