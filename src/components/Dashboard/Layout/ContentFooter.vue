<template>
  <footer class="footer">
    <div class="container-fluid">
      Contract Address: {{ address }}
      <div class="copyright text-center">
      </div>
    </div>
  </footer>
</template>
<script>
export default {

  data() {
    return {
      address: this.$store.state.contract.address
    }
  }

}
</script>
<style lang="scss" scoped>
.container-fluid {
  margin: 20px 10px;
  font-size: 16px;
  color: #888888;
}

</style>
