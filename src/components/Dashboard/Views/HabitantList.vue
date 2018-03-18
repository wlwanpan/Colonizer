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
                       :columns="table.columns"
                       :data="table.data"
                       :showReport="true">
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
export default {

  components: {
    LTable,
    Card
  },

  props: {
    selectedAsset: Object
  },

  mounted () {
    // debugger
  },

  data () {
    return {
      table: {
        columns: ['FullName', 'Colony', ''],
        data: [...this.$store.getters.getHabitants]
      }
    }
  }

}
</script>
<style>
</style>
