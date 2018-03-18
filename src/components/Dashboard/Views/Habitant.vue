<template>
  <div class="content">
    <div v-if="showForm" class="container-fluid">
      <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
          <register-habitant-form>
          </register-habitant-form>
          <deregister-habitant-form>
          </deregister-habitant-form>
          <get-current-state-form>
          </get-current-state-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RegisterHabitantForm from './HabitantProfile/RegisterHabitantForm.vue'
import DeregisterHabitantForm from './HabitantProfile/DeregisterHabitantForm.vue'
import GetCurrentStateForm from './HabitantProfile/GetCurrentStateForm.vue'

export default {

  data () {
    return {
      showForm: false
    }
  },

  components: {
    RegisterHabitantForm,
    DeregisterHabitantForm,
    GetCurrentStateForm
  },

  mounted () {
    if (this.$store.state.habitant.status == 'online') {
      this.$router.push('/admin/habitant-detail')
    }
    else {
      this.showForm = true
    }
  }
}
</script>
<style>
</style>
