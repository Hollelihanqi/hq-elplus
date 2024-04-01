import request from "./request";

// 列表
export const getList = (params = {}) => {
  console.log(params);
  return request.request({
    url: "/v2/opttag",
    params,
  });
};

// 新建
export const createItem = (params = {}) => {
  return request.request({
    url: "/v2/opttag",
    method: "POST",
    data: params,
  });
};

// 编辑
export const deleteItem = (params = {}) => {
  return request.request({
    url: "/v2/opttag",
    method: "DELETE",
    params,
  });
};
