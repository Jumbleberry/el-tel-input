<template>
  <div class="el-tel-input">
    <el-input placeholder="Please input" :value="number" @input="handleNumberInput" class="input-with-select">
      <el-select :value="countryCode" @input="handleCountryCodeInput" filterable slot="prepend" popper-class="vue-tel-input-component-dropdown" placeholder="Country">
        <el-flagged-label slot="prefix" v-if="selectedCountry" :country="selectedCountry" :show-name="false"></el-flagged-label>
        <el-option v-for="country in allCountries" :key="country.iso2" :value="country.iso2" :label="`+${country.dialCode}`">
          <el-flagged-label :country="country"></el-flagged-label>
        </el-option>
      </el-select>
    </el-input>
  </div>
</template>
<script>
import allCountries from '@/assets/data/all-countries';
import ElFlaggedLabel from '@/components/ElFlaggedLabel';

export default {
  name: 'ElTelInput',
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      allCountries,
      countryCode: '',
      number: ''
    };
  },
  components: {
    ElFlaggedLabel
  },
  computed: {
    selectedCountry() {
      return this.allCountries.find(c => c.iso2 === this.countryCode);
    }
  },
  methods: {
    handleNumberInput(value) {
      console.log(value);
    },
    handleCountryCodeInput(value) {
      this.countryCode = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tel-input {
  & /deep/ {
    .el-select .el-input {
      width: 120px;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 40px;
    }
  }
}

</style>
