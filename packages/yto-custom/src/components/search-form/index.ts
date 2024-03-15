import SearchForm from "./src/index.vue";

import { install } from "../../_utils";

export const YtoSearchForm = install(SearchForm);
export default YtoSearchForm;

export * from "./src/interface";
export type SearchFormInstance = InstanceType<typeof SearchForm>;
