<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Assets for Sale</h4>
              <p class="card-category"></p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table.columns"
                       :data="table.data"
                       :showBuy="table.showBuy">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import LTable from '@/components/UIComponents/Table.vue'
import Card from '@/components/UIComponents/Cards/Card.vue'
const tableColumns = ['Owner', 'Value', 'Description', 'Asset Type', 'Longitude', 'Latitude', '']
const tableData = []

export default {

  components: {
    LTable,
    Card
  },

  props: {
    selectedAsset: Object
  },

  data () {
    return {
      table: {
        columns: [...tableColumns],
        data: [...this.$store.getters.getAssets({onSale: true})],
        showBuy: "true"
      }
    }
  },

  mounted() {
  }
}
</script>
<style>
.card-plain {
  background-color: white;
}
</style>
