<template>
  <card>
    <h4 slot="header" class="card-title">Archieve habitant</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="username">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text"
                    label="Password"
                    placeholder="Password"
                    v-model="password">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill float-left" @click.prevent="deregisterHabitant">
          Deregister Habitant
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/UIComponents/Cards/Card.vue'

export default {
  components: {
    Card
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },

  computed: {

  },

  methods: {
    deregisterHabitant () {
      var contract = this.$store.getters.getContract
      var params = [
        this.username, this.password
      ]

      this.$store.dispatch(
        'contactCall',
        {
          method: 'deregisterHabitant',
          params
        }
      )
      .then(results => {
        console.log(results)
        this.$router.push('/admin/habitant-detail')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
