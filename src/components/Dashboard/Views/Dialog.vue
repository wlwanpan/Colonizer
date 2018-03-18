<template>
  <div id="confirm-dialog">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <div>
        <button class="btn-success btn-fill" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'title',
    'message'
  ]
}

</script>

<style lang='scss' scoped>

#confirm-dialog {
  display: flex;
  padding: 10px 30px;
}

.wrapper {

}

h1 {
  color: #333333;
  font-weight: 300;
}

button {
  border-radius: 5px;
  padding: 6px 100px;
}

</style>