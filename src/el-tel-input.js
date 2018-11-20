import ElTelInput from './components/ElTelInput';

export default {
  ...ElTelInput,
  install: Vue => {
    Vue.component(ElTelInput.name, ElTelInput);
    return Vue;
  }
};
