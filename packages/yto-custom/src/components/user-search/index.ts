import UserSearch from './src/index.vue';

import { install } from '../../_utils';

export const YtoUserSearch = install(UserSearch);

export type { UserSearchInstance } from './src/instance';

export default YtoUserSearch;
