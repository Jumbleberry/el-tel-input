import Vue from 'vue';
import { Input, Select, Option } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
