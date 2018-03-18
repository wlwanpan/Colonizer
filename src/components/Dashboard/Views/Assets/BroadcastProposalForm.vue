<template>
  <card>
    <div class="row">
      <div class="col-md-1"></div>
      <h4 slot="header" class="card-title col-md-10">Broadcast new colony Proposal for {{ colony }}</h4>
    </div>
    <form>

      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <fg-input type="text" label="Title" placeholder="Title" v-model="title"></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <textarea type="text" label="Description" placeholder="Write your proposal mockup" v-model="description"></textarea>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill" @click.prevent="broadcastProposal">
          Submit
        </button>
        <button type="submit" class="btn btn-fill" @click.prevent="backOnePage">
          Cancel
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/UIComponents/Cards/Card.vue'

export default {

  data () {
    return {
      colony: this.$store.state.habitant.colony,
      title: '',
      description: ''
    }
  },

  methods: {

    broadcastProposal () {
      debugger
      // this.$store.dispatch('contactCall', { method: 'registerAsset', params })
    },

    backOnePage () {
      this.$router.go(-1)
    }
  },

  components: {
    Card
  }
}

</script>
<style lang='scss' scoped>

textarea {
  width: 100%; height: 250px !important;
  background-color: #FFFFFF;
  border: 1px solid #E3E3E3;
  border-radius: 4px;
  color: #565656;
  padding: 8px 12px;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;

  &:focus {
    background-color: #FFFFFF;
    border: 1px solid #AAAAAA;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 0 !important;
    color: #333333;
  }
}

</style>
