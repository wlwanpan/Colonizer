<template>
  <card>
    <h4 slot="header" class="card-title">Get State of habitant</h4>
    <form>
      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill float-left" @click.prevent="getHabitantState">
          Get Current State
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

  computed: {

  },

  methods: {
    getHabitantState () {
      var contract = this.$store.getters.getContract
      this.$store.dispatch(
        'contactCall',
        {
          method: 'getHabitantState',
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
