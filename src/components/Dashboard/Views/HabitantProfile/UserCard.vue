<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-6" @click.prevent="registerAssets">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bullet-list-67 text-warning"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">Register Assets</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6" @click.prevent="registerColony">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">Register Colony</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6" @click.prevent="broadcastProposal">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">Broadcast Proposal</h4>
            </div>
          </stats-card>
        </div>

      </div>

      <div class="row">
        <card class="card-user">
          <img slot="image" src="static/img/future.JPG" alt="..."/>
          <div class="author">
            <a href="#">
              <img class="avatar border-gray" src="static/img/faces/face-0.jpg" alt="..."/>

              <h4 class="title">{{firstName}} {{lastName}}<br />
                <small>{{username}}</small>
              </h4>
            </a>
          </div>
          <p class="description text-center"> {{colony}} - {{address}}</p>
        </card>
      </div>

      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Assets</h4>
              <p class="card-category">List of assets owned by {{firstName}}</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="tableData.columns"
                       :data="tableData.data"
                       :showSell="tableData.showSell">
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Card from '@/components/UIComponents/Cards/Card.vue'
import StatsCard from '@/components/UIComponents/Cards/StatsCard.vue'
import LTable from '@/components/UIComponents/Table.vue'

const tableColumns = ['Owner', 'Value', 'Description', 'AssetType', 'Longitude', 'Latitude']
const tableData = []
export default {

  data () {
    return {
      firstName: this.$store.state.habitant.firstName,
      lastName: this.$store.state.habitant.lastName,
      username: this.$store.state.habitant.username,
      colony: this.$store.state.habitant.colony,
      address: this.$store.state.habitant.address
    }
  },

  computed: {
    tableData: function () {
      return {
        columns: [...tableColumns],
        data: [...this.$store.getters.getAssets({ owned: true })],
        showSell: "true"
      }
    }
  },

  methods: {

    getClasses (index) {
      var remainder = index % 3
      if (remainder === 0) {
        return 'col-md-3 col-md-offset-1'
      } else if (remainder === 2) {
        return 'col-md-4'
      } else {
        return 'col-md-3'
      }
    },
    registerAssets () {
        this.$router.push('/admin/assets-form')
    },
    registerColony () {
      console.log('registerColony called')
    },
    broadcastProposal () {
      this.$router.push('/admin/proposal-form')
    }
  },

  components: {
    Card,
    StatsCard,
    LTable
  }

}

</script>
<style>
.card-image img {
  margin-top: -200px !important;
}
.col-xl-3 {
  margin-bottom: 15px;
}
</style>
