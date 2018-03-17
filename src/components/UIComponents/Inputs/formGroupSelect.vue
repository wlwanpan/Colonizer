<template>
  <div class="form-group" :class="{'input-group': hasIcon}">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{label}}
      </label>
    </slot>
    <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-addon">
        <i :class="addonLeftIcon"></i>
      </span>
    </slot>
    <select
      :value="value"
      @input="$emit('select',$event.target.value)"
      v-bind="$attrs"
      class="form-control"
      aria-describedby="addon-right addon-left">
      <option v-for="option in options">
        {{ option.text }}
      </option>
    </select>
    <slot></slot>
    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-addon">
        <i :class="addonRightIcon"></i>
      </span>
    </slot>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: 'fg-select',
    props: {
      label: String,
      options: [String],
      value: [String, Number],
      addonRightIcon: String,
      addonLeftIcon: String
    },
    computed: {
      hasIcon () {
        const {addonRight, addonLeft} = this.$slots
        return addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined
      }
    }
  }
</script>
<style>

</style>
