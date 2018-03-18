<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
          <broadcast-proposal-form>
          </broadcast-proposal-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BroadcastProposalForm from './Assets/BroadcastProposalForm.vue'

  export default {
    components: {
      BroadcastProposalForm,
    }
  }

</script>
<style>

</style>
