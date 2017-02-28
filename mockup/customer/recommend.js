exports.response = function (req, res) {
  let data = [
    {
      "clientScore": 97,
      "expectedYield": 4.8,
      "productCode": "S42745",
      "productName": "华泰紫金保和2号B1份额",
      "categoryCode": "XE090000001005",
      "categoryName": "混合基金",
      "directoryCode": "XE090000",
      "directoryName": null,
      "bfMaturity": 91,
    },
    {
      "clientScore": 96,
      "expectedYield": 4.9,
      "productCode": "S42745",
      "productName": "华泰紫金保和2号B1份额",
      "categoryCode": "XE090000001005",
      "categoryName": "混合基金",
      "directoryCode": "XE090000",
      "directoryName": null,
      "bfMaturity": 91,
    },
    {
      "clientScore": 95,
      "expectedYield": 4.5,
      "productCode": "S42745",
      "productName": "华泰紫金保和2号B1份额",
      "categoryCode": "XE090000001005",
      "categoryName": "混合基金",
      "directoryCode": "XE090000",
      "directoryName": null,
      "bfMaturity": 91,
    },
  ];
  return {
    code: 0,
    msg: {
      global: "获取推荐产品列表失败"
    },
    resultData: data
  };
}
