import localVue from './setup';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import countryList from '../../src/assets/data/all-countries';
import ElTelInput from '../../src/components/ElTelInput';

describe('Component rendering test', () => {
  const nationalNumber = '996504804';
  const countryCallingCode = '56';
  const number = `+${countryCallingCode}${nationalNumber}`;
  const country = 'CL';

  const wrapper = shallowMount(ElTelInput, {
    localVue,
    propsData: {
      value: number
    }
  });
  it('Should have an input element for the number', () => {
    expect(wrapper.find('elinput-stub')).to.exist;
    expect(wrapper.find('elinput-stub').attributes('value')).to.equal(nationalNumber);
  });
  it('Should have a select element to pick a country', () => {
    expect(wrapper.find('elinput-stub elselect-stub')).to.exist;
    expect(wrapper.find('elinput-stub elselect-stub').attributes('value')).to.equal(country);
  });
  it('Should render a list with all the countries', () => {
    expect(wrapper.findAll('elinput-stub elselect-stub eloption-stub').length).to.equal(countryList.length);
  });
});

describe('Component v-model test', () => {
  const nationalNumber = '996504804';
  const countryCallingCode = '56';
  const country = 'CL';

  const newNationalNumber = '996504803';
  const newCountryCallingCode = '1';
  const newCountry = 'CA';

  const wrapper = shallowMount(ElTelInput, {
    localVue,
    propsData: {
      value: '+56996504804'
    }
  });

  it('Should initialize the component data with the given value prop', () => {
    expect(wrapper.vm.country).to.equal(country);
    expect(wrapper.vm.countryCallingCode).to.equal(countryCallingCode);
    expect(wrapper.vm.nationalNumber).to.equal(nationalNumber);
  });

  it('Should emit [`input`, `input-details`] events when handleNationalNumberInput is triggered', () => {
    const newNumber = `+${countryCallingCode}${newNationalNumber}`;
    wrapper.vm.handleNationalNumberInput(newNationalNumber);
    expect(wrapper.emitted().input[0][0]).to.equal(newNumber);
    expect(wrapper.emitted()['input-details'][0][0]).to.include({
      countryCallingCode: countryCallingCode,
      country: country,
      nationalNumber: newNationalNumber,
      number: newNumber,
      isValid: true
    });
  });

  it('Should emit [`input`, `input-details`] events when handleCountryCodeInput is triggered', () => {
    const newNumber = `+${newCountryCallingCode}${newNationalNumber}`;
    wrapper.vm.handleCountryCodeInput('CA');
    expect(wrapper.emitted().input[1][0]).to.equal(newNumber);
    expect(wrapper.emitted()['input-details'][1][0]).to.include({
      countryCallingCode: newCountryCallingCode,
      country: newCountry,
      nationalNumber: newNationalNumber,
      number: newNumber,
      isValid: false
    });
  });
});

describe('Component optional props', () => {
  const defaultCountry = 'CA';
  const preferredCountries = ['CA', 'CL'];
  const wrapper = shallowMount(ElTelInput, {
    localVue,
    propsData: {
      defaultCountry,
      preferredCountries
    }
  });

  it('Should initialize the component with the default country', () => {
    expect(wrapper.find('elselect-stub').attributes('value')).to.equal(defaultCountry);
  });
  it('Should show the preffered countries at the top of the list', () => {
    expect(
      wrapper
        .findAll('elselect-stub eloption-stub')
        .at(0)
        .attributes('value')
    ).to.equal(preferredCountries[0]);
    expect(
      wrapper
        .findAll('elselect-stub eloption-stub')
        .at(1)
        .attributes('value')
    ).to.equal(preferredCountries[1]);
  });
});
