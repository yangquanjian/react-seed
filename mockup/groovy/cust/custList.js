exports.response = function (req, res) {
  return {
    "code": "0",
    "msg": "OK",
    "resultData": {
      "page": {
        "pageSize": 100,
        "curPageNum": 2,
        "totalPageNum": 72,
        "totalRecordNum": 7150
      },
      "resultList": [
        {
          "cusId": "1-3AB90H2",
          "custName": "孙伟斌孙",
          "brokerNumber": "666600983047",
          "custLevelCode": "805040",
          "custLevelName": "空",
          "custTotalAsset": 0,
          "custType": "per",
          "custOpenDate": "2015/03/27"
        },
      ]
    }
  } 
}
