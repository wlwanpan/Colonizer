<template>
  <div id="confirm-dialog">
    <div class="wrapper">
      <div>
        <h1>{{ id }}</h1>
        <p>{{ title }}</p>
      </div>
      <p>{{ proposal }}</p>
      <div>
        <button class="btn-success btn-fill" @click="$emit('close')">Agree</button>
        <button class="btn-default btn-fill" @click="$emit('close')">Decline</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'id',
    'title',
    'proposal'
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