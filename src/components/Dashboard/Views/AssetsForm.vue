<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
          <register-assets-form>
          </register-assets-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RegisterAssetsForm from './Assets/RegisterAssetsForm.vue'

  export default {
    components: {
      RegisterAssetsForm,
    }
  }

</script>
<style>

</style>
