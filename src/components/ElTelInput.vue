<template>
  <div class="el-tel-input">
    <el-input :placeholder="placeholder" :value="nationalNumber" @input="handleNationalNumberInput" class="input-with-select">
      <el-select :value="country" @input="handleCountryCodeInput" filterable :filter-method="handleFilterCountries" slot="prepend" :popper-class="popperClass + ' el-tel-input__dropdown'" placeholder="Country">
        <el-flagged-label slot="prefix" v-if="selectedCountry" :country="selectedCountry" :show-name="false"></el-flagged-label>
        <el-option v-for="country in filteredCountries" :key="country.iso2" :value="country.iso2" :label="`+${country.dialCode}`" :default-first-option="true">
          <el-flagged-label :country="country"></el-flagged-label>
        </el-option>
      </el-select>
    </el-input>
  </div>
</template>
<script>
import axios from 'axios';
import allCountries from '@/assets/data/all-countries';
import ElFlaggedLabel from '@/components/ElFlaggedLabel';
import { parsePhoneNumber } from 'libphonenumber-js';

const getParsedPhoneNumber = function(number, country) {
  try {
    return parsePhoneNumber(number, country);
  } catch (e) {
    return {
      country: '',
      countryCallingCode: '',
      nationalNumber: '',
      number: number,
      isValid: false
    };
  }
};

export default {
  name: 'ElTelInput',
  props: {
    value: {
      type: String
    },
    preferredCountries: {
      type: Array,
      default: () => []
    },
    defaultCountry: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Phone Number'
    },
    popperClass: {
      type: String,
      default: ''
    }
  },
  data() {
    const parsedPhoneNumber = getParsedPhoneNumber(this.value, '');
    return {
      countryFilter: '',
      countryCallingCode: parsedPhoneNumber.countryCallingCode,
      country: parsedPhoneNumber.country || this.defaultCountry,
      nationalNumber: parsedPhoneNumber.nationalNumber
    };
  },
  components: {
    ElFlaggedLabel
  },
  async created() {
    const response = await axios.get('https://ipinfo.io/json').catch(() => {}) || { data: { country: "US" }};
    if (response && response.data && response.data.country)
      this.handleCountryCodeInput(response.data.country)
  },
  computed: {
    sortedCountries() {
      let normalizePreferredCountries = this.preferredCountries.map(c => c.toUpperCase());
      const preferredCountries = normalizePreferredCountries
        .map(country => allCountries.find(c => c.iso2 === country.toUpperCase()))
        .filter(Boolean)
        .map(country => ({ ...country, preferred: true }));

      return [...preferredCountries, ...allCountries.filter(c => !normalizePreferredCountries.includes(c.iso2))];
    },
    filteredCountries() {
      return this.sortedCountries.filter(c => c.name.toLowerCase().includes(this.countryFilter.toLowerCase()));
    },
    selectedCountry() {
      return this.sortedCountries.find(c => c.iso2 === this.country);
    }
  },
  methods: {
    handleFilterCountries(search) {
      this.countryFilter = search;
    },
    handleNationalNumberInput(value) {
      this.nationalNumber = value;
      this.handleTelNumberChange();
    },
    handleCountryCodeInput(value) {
      this.country = value;
      this.countryFilter = '';
      this.handleTelNumberChange();
    },
    handleTelNumberChange() {
      let telInput = {
        countryCallingCode: '',
        country: '',
        nationalNumber: this.nationalNumber,
        number: '',
        isValid: false
      };
      if (this.selectedCountry) {
        telInput.country = this.selectedCountry.iso2;
        telInput.countryCallingCode = this.selectedCountry.dialCode;
        if (this.nationalNumber && this.nationalNumber.length > 5) {
          const parsedPhoneNumber = getParsedPhoneNumber(this.nationalNumber, this.selectedCountry.iso2);
          telInput.nationalNumber = parsedPhoneNumber.nationalNumber;
          telInput.number = parsedPhoneNumber.number;
          telInput.isValid = parsedPhoneNumber.isValid();
        }
      }
      this.$emit('input', telInput.number);
      this.$emit('input-details', telInput);
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
