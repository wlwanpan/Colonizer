<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
          <register-habitant-form>
          </register-habitant-form>
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
  },

  beforeMount () {
    if (this.$store.getters.getHabitant.status == 'online') {
      this.$router.push('/admin/habitant-detail')
    }
  }
}
</script>
<style>

</style>
