<template>
  <card>
    <h4 slot="header" class="card-title">Register new Asset for {{firstName}} {{lastName}}</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="ID"
                    placeholder="ID"
                    v-model="asset.id">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text"
                    label="Value"
                    placeholder="$$"
                    v-model="asset.value">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="Description"
                    placeholder="Description"
                    v-model="asset.description">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-select type="text"
                    label="AssetType"
                    placeholder="type"
                    :options="assetTypeOptions"
                    v-model="asset.assetType">
          </fg-select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="Longitude"
                    placeholder="Longitude"
                    v-model="asset.longitude">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text"
                    label="Latitude"
                    placeholder="Latitude"
                    v-model="asset.latitude">
          </fg-input>
        </div>
      </div>


      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill" @click.prevent="registerAsset">
          Submit
        </button>
        <button type="submit" class="btn btn-fill" @click.prevent="back">
          Back
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/UIComponents/Cards/Card.vue'
import Dialog from '@/components/Dashboard/Views/Dialog.vue'

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
        assetType: 'Industrial',
        longitude: '345.35454',
        latitude: '6873.343'
      },
      assetTypeOptions: ["Residential", "Industrial", "Agricultural", "Community"]
    }
  },

  methods: {

    registerAsset () {
      // TODO: save assets to contract or whatever
      // registerAsset(uint256 _value, string _description, uint256 _assetType, string _longitude, string _latitude)
      let { value, description, assetType, longitude, latitude } = this.asset
      let params = [
        this.toBigNumber(value),
        description,
        this.toBigNumber(this.assetTypeOptions.indexOf(assetType)),
        longitude,
        latitude
      ]

      this.$store.dispatch(
        'contactCall',
        {
          method: 'registerAsset',
          params
        }
      )
      .then(result => {
        this.$modal.show(Dialog, {
          title: 'Transaction Successful', message: 'Your Asset has successfully been registered'
        }, {
          adaptive: true
        })
        this.$store.dispatch(
          'contactCall',
          {
            method: 'loadAssets',
            params: undefined
          }
        )
        .then((data) => {
          // debugger
        })
      })
    },

    back () {
      this.$router.go(-1)
    }
  }
}

</script>
<style>

</style>
