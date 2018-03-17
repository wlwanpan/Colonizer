<template>
  <card>
    <h4 slot="header" class="card-title">Register new Asset for {{firstName}} {{lastName}}</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <fg-input type="text"
                    label="ID"
                    placeholder="ID"
                    v-model="asset.id">
          </fg-input>
        </div>
        <div class="col-md-5">
          <fg-input type="text"
                    label="Value"
                    placeholder="$$"
                    v-model="asset.value">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <fg-input type="text"
                    label="Description"
                    placeholder="Description"
                    v-model="asset.description">
          </fg-input>
        </div>
        <div class="col-md-5">
          <fg-input type="text"
                    label="AssetType"
                    placeholder="type"
                    v-model="asset.assetType">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <fg-input type="text"
                    label="Longitude"
                    placeholder="Longitude"
                    v-model="asset.longitude">
          </fg-input>
        </div>
        <div class="col-md-5">
          <fg-input type="text"
                    label="Latitude"
                    placeholder="Latitude"
                    v-model="asset.latitude">
          </fg-input>
        </div>
      </div>


      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill float-left" @click.prevent="registerAsset">
          Submit
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
        firstName: this.$store.getters.getHabitant.firstName,
        lastName: this.$store.getters.getHabitant.lastName,
        asset: {
          id: '4837493-4324343',
          value: '33333',
          description: 'a proper territory',
          assetType: 'warner',
          longitude: '345.35454',
          latitude: '6873.343'
        }
      }
    },

    methods: {
      registerAsset () {
        // TODO: save assets to contract or whatever
        this.$router.push('/admin/market-place');
      }
    }
  }

</script>
<style>

</style>
