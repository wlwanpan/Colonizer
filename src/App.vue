<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <modals-container></modals-container>
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
import Dialog from '@/components/Dashboard/Views/Dialog.vue'

export default {
  mounted () {
    var {colonizer, address} = this.$store.state.contract
    var contract = colonizer.at(address)

    contract.ProposalEvent({}, {fromBlock: 0, toBlock: 'latest'}, (tx) => {
      if (tx) {
        _(tx.logs).each((log) => {
          if (log.event == "ProposalEvent") { this.$modal.show(Dialog, log.args) }
        })
      }
    })
  }
}

</script>

<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
