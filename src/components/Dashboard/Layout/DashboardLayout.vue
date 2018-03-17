<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/admin/planet">
        <i class="nc-icon nc-globe-2"></i>
        <p>Planet</p>
      </sidebar-link>
      <sidebar-link to="/admin/habitant">
        <i class="nc-icon nc-circle-09"></i>
        <p>Habitant</p>
      </sidebar-link>
      <sidebar-link to="/admin/market-place">
        <i class="nc-icon nc-money-coins"></i>
        <p>Assets</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
