exports.response = function (req, res) {
  return {
    "code": "0",
    "msg": "OK",
    "resultData": {
      "custBaseInfo": {
        "econNum": "02007829",
        "custName": "1-DU-5288",
        "totAsset": "43.84",
        "custGrade": "金",
        "lastCommission": "08/30/2016",
        "gender": "男",
        "age": "52",
        "acctType": null,
        "industry": null
      },
      "custMoneyDistributionDTOList": [
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA200000",
          "categoryName": "现金",
          "maketVal": 200,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA070000",
          "categoryName": "理财产品",
          "maketVal": 200,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA060000",
          "categoryName": "衍生品",
          "maketVal": 200,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA050000",
          "categoryName": "开放式基金",
          "maketVal": 200,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA040000",
          "categoryName": "股票",
          "maketVal": 400,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA030000",
          "categoryName": "债券",
          "maketVal": 400,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA300000",
          "categoryName": "负债",
          "maketVal": 200,
          "holdRate": 0,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA090000",
          "categoryName": "OTC产品",
          "maketVal": 200,
          "holdRate": 0.0625,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA100000",
          "categoryName": "私募产品",
          "maketVal": 200,
          "holdRate": 0.125,
          "pftVal": 0,
          "dataDate": "20160331"
        },
        {
          "custId": "02007829",
          "custAcrmSystemId": "A000000000677016",
          "categoryId": "PA020000",
          "categoryName": "权证产品",
          "maketVal": 200,
          "holdRate": 0.0625,
          "pftVal": 0,
          "dataDate": "20160331"
        }
      ],
      "monthlyProfits": [
        {
          "month": "201606",
          "assetProfit": 3628.56,
          "assetProfitRate": 1
        },
        {
          "month": "201607",
          "assetProfit": -4818,
          "assetProfitRate": -1.32
        },
        {
          "month": "201608",
          "assetProfit": 7118,
          "assetProfitRate": 1.97
        },
        {
          "month": "201609",
          "assetProfit": 6189.49,
          "assetProfitRate": 1.68
        },
        {
          "month": "201610",
          "assetProfit": -20674.98,
          "assetProfitRate": -5.52
        },
        {
          "month": "201611",
          "assetProfit": 2886,
          "assetProfitRate": 0.81
        }
      ]
    }
  };
};
