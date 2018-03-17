<template>
  <card>
    <h4 slot="header" class="card-title">Register new habitant</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <fg-input type="text"
                    label="First Name"
                    placeholder="First Name"
                    v-model="user.firstName">
          </fg-input>
        </div>
        <div class="col-md-5">
          <fg-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="user.lastName">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <fg-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="user.username">
          </fg-input>
        </div>
        <div class="col-md-5">
          <fg-input type="text"
                    label="Password"
                    placeholder="Password"
                    v-model="user.password">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <fg-select type="text"
                    label="Colony"
                    placeholder="Colony"
                    :options="options"
                    v-model="user.colony">
          </fg-select>
        </div>
      </div>


      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-left" @click.prevent="registerHabitant">
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
        user: {
          firstName: 'James',
          lastName: 'Wan',
          username: 'james.wan',
          password: '',
          colony: ''
        },
        options: ["ColonyA", "ColonyB", "ColonyC"]
      }
    },

    methods: {
      registerHabitant () {
        debugger
      }
    }
  }

</script>
<style>

</style>
