<template>
  <div id="app">
    <el-tel-input :value="telNumber.number" :preferred-countries="['CA','US','CN']" @input="handleElTelInput"></el-tel-input>
    <code>
      {{ this.telNumber }}
    </code>
  </div>
</template>

<script>
import ElTelInput from '@/components/ElTelInput';
export default {
  name: 'ElTelInputDemo',
  data() {
    return {
      telNumber: {
        country: '',
        countryCallingCode: '',
        nationalNumber: '',
        number: '',
        isValid: false
      }
    };
  },
  components: {
    ElTelInput
  },
  methods: {
    handleElTelInput(value) {
      this.telNumber = value;
    }
  }
};
</script>
<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 70vw;
  margin: 60px auto 0 auto;
}
</style>
