<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <register-assets-form>
          </register-assets-form>
        </div>
        <div class="col-md-4">
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
