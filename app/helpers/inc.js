import { helper } from "@ember/component/helper";

export default helper(function inc(params /*, hash*/) {
  let dataId = params[0] + 1;
  return dataId;
});
