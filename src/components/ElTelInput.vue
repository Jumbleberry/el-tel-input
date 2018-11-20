<template>
  <div class="el-tel-input">
    <el-input placeholder="Please input" :value="nationalNumber" @input="handleNationalNumberInput" class="input-with-select">
      <el-select :value="country" @input="handleCountryCodeInput" filterable :filter-method="handleFilterCountries" slot="prepend" popper-class="el-tel-input__dropdown" placeholder="Country">
        <el-flagged-label slot="prefix" v-if="selectedCountry" :country="selectedCountry" :show-name="false"></el-flagged-label>
        <el-option v-for="country in filteredCountries" :key="country.iso2" :value="country.iso2" :label="`+${country.dialCode}`">
          <el-flagged-label :country="country"></el-flagged-label>
        </el-option>
      </el-select>
    </el-input>
  </div>
</template>
<script>
import allCountries from '@/assets/data/all-countries';
import ElFlaggedLabel from '@/components/ElFlaggedLabel';
import { parsePhoneNumber } from 'libphonenumber-js';

export default {
  name: 'ElTelInput',
  props: {
    value: {
      type: String
    }
  },
  data() {
    const parsedPhoneNumber = parsePhoneNumber(this.value);
    return {
      allCountries,
      filteredCountries: allCountries,
      countryCallingCode: parsedPhoneNumber.countryCallingCode,
      country: parsedPhoneNumber.country,
      nationalNumber: parsedPhoneNumber.nationalNumber
    };
  },
  components: {
    ElFlaggedLabel
  },
  computed: {
    selectedCountry() {
      return this.allCountries.find(c => c.iso2 === this.country);
    }
  },
  methods: {
    handleFilterCountries(search) {
      this.filteredCountries = this.allCountries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    },
    handleNationalNumberInput(value) {
      this.nationalNumber = value;
      this.handleTelNumberChange();
    },
    handleCountryCodeInput(value) {
      this.country = value;
      this.handleTelNumberChange();
    },
    handleTelNumberChange() {
      let telInput = {
        countryCallingCode: '',
        country: '',
        nationalNumber: '',
        number: '',
        isValid: false
      };
      if (this.selectedCountry && this.nationalNumber && this.nationalNumber.length > 5) {
        const parsedPhoneNumber = parsePhoneNumber(this.nationalNumber, this.selectedCountry.iso2);
        telInput.country = parsedPhoneNumber.country;
        telInput.countryCallingCode = parsedPhoneNumber.countryCallingCode;
        telInput.nationalNumber = parsedPhoneNumber.nationalNumber;
        telInput.number = parsedPhoneNumber.number;
        telInput.isValid = parsedPhoneNumber.isValid();
      }
      this.$emit('input', telInput);
    }
  }
};
</script>
<style lang="scss">
.el-tel-input {
  .el-select .el-input {
    width: 120px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }
}
.el-tel-input__dropdown {
  .el-select-dropdown__item {
    line-height: 40px;
  }
}
</style>
