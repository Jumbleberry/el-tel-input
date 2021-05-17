<template>
  <div id="app">
    <el-tel-input v-model="telNumber" @input-details="handleElTelInputDetails" default-country="CA" :preferred-countries="['CA','US','CN']" :detect-country-code-from-ip="false"></el-tel-input>
    <code>
      {{ this.telNumberDetails }}
    </code>
  </div>
</template>

<script>
import ElTelInput from '@/components/ElTelInput';
export default {
  name: 'ElTelInputDemo',
  data() {
    return {
      telNumber: '',
      telNumberDetails: {
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
    handleElTelInputDetails(value) {
      this.telNumberDetails = value;
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
