<template>
  <card>
    <h4 slot="header" class="card-title">Register new habitant</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="First Name"
                    placeholder="First Name"
                    v-model="firstName">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="lastName">
          </fg-input>
        </div>
      </div>
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
      <div class="row">
        <div class="col-md-6">
          <fg-select type="text"
                    label="Colony"
                    placeholder="Colony"
                    :options="options"
                    v-model="colony">
          </fg-select>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill float-left" @click.prevent="registerHabitant">
          Register Habitant
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
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      colony: '',
      options: ["ColonyA", "ColonyB", "ColonyC"]
    }
  },

  computed: {
    fullName() {
      return [this.firstName, this.lastName].join(' ')
    }
  },

  methods: {
    registerHabitant () {
      var params = [
        this.fullName, this.username, this.password, "ColonyA"
      ]

      this.$store.dispatch(
        'contactCall',
        {
          method: 'registerHabitant',
          params
        }
      )
      .then(results => {

        let { firstName, lastName, username, password, colony } = this.$data
        this.$store.dispatch(
          'updateHabitant',
          { firstName, lastName, username, password, colony }
        )
        this.$router.push('/admin/habitant-detail')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
