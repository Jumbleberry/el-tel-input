<template>
  <div id="app">
    <vue-tel-input></vue-tel-input>
  </div>
</template>

<script>
import VueTelInput from '@/components/ElTelInput';
export default {
  name: 'ElTelInput',
  components: {
    VueTelInput
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
