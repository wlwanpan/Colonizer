<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th v-for="column in columns">{{column}}</th>
      </slot>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <slot :row="item">
        <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
        <td v-if="showBuy"><button type="submit" class="btn btn-success btn-fill" @click.prevent="clickBuyAsset(item)">Buy</button></td>
        <td v-if="showSell"><button type="submit" class="btn btn-success btn-fill" @click.prevent="clickSellAsset(item)">Sell</button></td>
        <td v-if="showReport"><button type="submit" class="btn btn-default btn-fill" @click.prevent="reportHabitant(item)">Report</button></td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'l-table',
  props: {
    columns: Array,
    data: Array,
    showBuy: String,
    showSell: String,
    showReport: Boolean
  },
  mounted () {
    // debugger
  },
  methods: {

    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },

    itemValue (item, column) {
      return item[column.toLowerCase()]
    },

    clickBuyAsset(asset) {
      // TODO: need to buy some assets

    },

    clickSellAsset(asset) {
      console.log("gonnna sell this asset" + asset.assetId)
      var params = [ asset.assetId, this.toBigNumber(asset.value) ]
      this.$store.dispatch('contactCall', { method: 'sellAsset', params })
    }
  }
}
</script>
<style>
</style>
