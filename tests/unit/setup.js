import { createLocalVue } from '@vue/test-utils';

import { Select, Input, Option, Dropdown } from 'element-ui';

const localVue = createLocalVue();
localVue.use(Select);
localVue.use(Input);
localVue.use(Option);
localVue.use(Dropdown);

export default localVue;
