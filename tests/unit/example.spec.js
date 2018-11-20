import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import sinon from 'sinon'
import component from '../../src/App'
import ElTelInput from '../../src/components/ElTelInput'
describe('Component high level rendering/construction tests', () => {
  const Constructor = Vue.extend(component);
  const componentInstance = new Constructor().$mount();

  it('should instantiate with function handleElTelInput', () => {
    expect(typeof componentInstance.handleElTelInput).to.equal('function')
  })

  it('sets the correct default data', () => {
    const defaultData = componentInstance.telNumber
    expect(defaultData.country).to.equal("")
    expect(defaultData.countryCallingCode).to.equal("")
    expect(defaultData.nationalNumber).to.equal("")
    expect(defaultData.number).to.equal('')
    expect(defaultData.isValid).to.equal(false)
  })

  it('renders the correct message', () => {
    expect(componentInstance.$el.children[0].textContent).to.be.a("string").that.includes("Canada").and.includes("United States").and.includes("China")
    //optionally:
    expect(componentInstance.$el.children[1].textContent).to.equal('\n    {\n  "country": "",\n  "countryCallingCode": "",\n  "nationalNumber": "",\n  "number": "",\n  "isValid": false\n}\n  ')
  })
})

describe('Component user interaction function tests', ()=>{
  const Constructor = Vue.extend(ElTelInput);
  const componentInstance = new Constructor({propsData: {value: '', preferredCountries:['CA','US','CN']}}).$mount();
  beforeEach(()=>{
    sinon.spy(componentInstance, 'handleTelNumberChange')
  })
  afterEach(()=>{
    componentInstance.handleTelNumberChange.restore()
  })
  it('should test if component instantiated and handleTelNumberChange exists', ()=>{
    expect(componentInstance.countryFilter).to.equal('')
    expect(componentInstance.countryCallingCode).to.equal('')
    expect(componentInstance.country).to.equal('')
    expect(componentInstance.nationalNumber).to.equal('')
    expect(typeof componentInstance.handleTelNumberChange).to.equal("function")
  })
  it('should test if handleNationalNumberInput() calls handleTelNumberChange()',()=>{
    componentInstance.handleNationalNumberInput("234567890")
    expect(componentInstance.handleTelNumberChange.called).to.equal(true)
  })
  it('should test if handleCountryCodeInput() calls handleTelNumberChange()',()=>{
    componentInstance.handleCountryCodeInput("CA")
    expect(componentInstance.handleTelNumberChange.called).to.equal(true)
  })
  it('should test if handleNationalNumberInput("234567890") updates componentInstance.nationalNumber',()=>{
    componentInstance.handleNationalNumberInput("234567890")
    expect(componentInstance.nationalNumber).to.equal("234567890")
  })
  it('should test if handleCountryCodeInput("CA") updates componentInstance.country',()=>{
    componentInstance.handleCountryCodeInput("CA")
    expect(componentInstance.country).to.equal("CA")
  })
  // TBD for below: need to figure out how to catch the input object in the parent
  // it('should test if handleCountryCodeInput and handleNationalNumberInput updates componentInstance.number',()=>{
  //   componentInstance.handleCountryCodeInput("CA")
  //   componentInstance.handleNationalNumberInput("234567890")
  //   Vue.nextTick(()=>{
  //     expect(componentInstance.number).to.equal("+1234567890")
  //   })
  // })
})

