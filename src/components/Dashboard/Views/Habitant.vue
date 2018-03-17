<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <register-habitant-form>
          </register-habitant-form>
        </div>
        <div class="col-md-4">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RegisterHabitantForm from './HabitantProfile/RegisterHabitantForm.vue'

  export default {
    components: {
      RegisterHabitantForm,
    }
  }

</script>
<style>

</style>
