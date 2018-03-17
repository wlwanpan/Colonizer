<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Assets for Sale</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table2.columns"
                       :data="table2.data"
                       :showBuy="table2.showBuy">
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
const tableColumns = ['seller', 'value', 'description', 'assetType', 'longitude', 'latitude', '']
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
      table1: {
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
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
</style>
