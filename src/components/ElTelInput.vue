<template>
  <div class="el-tel-input">
    <el-input
      ref="input"
      class="input-with-select"
      v-bind="$attrs"
      v-on="$listeners"
      :size="size"
      :placeholder="placeholder"
      :value="nationalNumber"
      @input="handleNationalNumberInput">
      <template #prepend>
        <slot name="prepend">
          <el-select
            slot="prepend"
            filterable
            placeholder="Country"
            :value="country"
            @input="handleCountryCodeInput"
            :filter-method="handleFilterCountries"
            :popper-class="popperClass + ' el-tel-input__dropdown'">
            <el-flagged-label slot="prefix" v-if="selectedCountry" :country="selectedCountry" :show-name="false" />
            <el-option
              v-for="country in filteredCountries"
              :key="country.iso2"
              :value="country.iso2"
              :label="`+${country.dialCode}`"
              :default-first-option="true">
              <el-flagged-label :country="country" />
            </el-option>
          </el-select>
        </slot>
      </template>

      <template slot="prefix">
        <slot name="prefix" />
      </template>

      <template slot="suffix">
        <slot name="suffix" />
      </template>

      <template slot="append">
        <slot name="append" />
      </template>

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
      nationalNumber: number,
      number: '',
      isValid: false
    };
  }
};

export default {
  name: 'ElTelInput',
  props: {
    value: {
      type: Object
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
    const parsedPhoneNumber = getParsedPhoneNumber(this.value.nationalNumber, this.value.country);
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
    const response = (await axios.get('https://ipinfo.io/json').catch(() => {})) || { data: { country: 'US' } };
    if (response && response.data && response.data.country) {
      this.handleCountryCodeInput(response.data.country);
    }
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
    },
    size() {
      return this.$attrs.size || 'mini';
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        const parsedPhoneNumber = getParsedPhoneNumber(newValue.nationalNumber, newValue.country);
        this.countryCallingCode = parsedPhoneNumber.countryCallingCode || this.countryCallingCode;
        this.country = parsedPhoneNumber.country || this.country || this.defaultCountry;
        this.nationalNumber = parsedPhoneNumber.nationalNumber || this.nationalNumber;
      }
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
