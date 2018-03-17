<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      msg: this.$store.getters.getDappTitle
    }
  },
  computed: {
  },
  beforeCreate: function () {
  },
  methods: {
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
