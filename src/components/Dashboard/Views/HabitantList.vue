<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Habitants</h4>
              <p class="card-category">A Complete List of Habitants in your Colony</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table2.columns"
                       :data="table2.data">
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
const tableColumns = ['FullName', 'Penalty Score', 'Colony']
const tableData = []
export default {

  components: {
    LTable,
    Card
  },

  props: {
    selectedAsset: Object
  },

  mounted () {
  },

  data () {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        columns: [...tableColumns],
        data: [...this.$store.getters.getHabitants]
      }
    }
  }

}
</script>
<style>
</style>
