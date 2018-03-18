<template>
  <nav class="navbar navbar-expand-lg">
    <div v-if="transactionProcessing" class="container-fluid">
      <a class="navbar-brand transaction-loader" href="#">
        Processing Transaction <span>.</span><span>.</span><span>.</span>
      </a>
    </div>
    <div v-else class="container-fluid">
      <a class="navbar-brand" href="#">Planet</a>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-planet"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {

    ...mapGetters([
      'transactionProcessing'
    ]),

    routeName () {
      const {name} = this.$route
      return this.capitalizeFirstLetter(name)
    }

  },
  data () {
    return {
      activeNotifications: false,
      transactionLoading: false
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown () {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown () {
      this.activeNotifications = false
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes blink {
  50% { color: transparent }
}

.transaction-loader {
  span { animation: 1.5s blink infinite; }
  span:nth-child(2) { animation-delay: 0.5s; }
  span:nth-child(3) { animation-delay: 1s; }
}

</style>
