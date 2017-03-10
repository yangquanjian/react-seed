exports.response = function (req, res) {
  return {
    "code": "0",
    "msg": "OK",
    "resultData": {
      "name": "1-OXZ5",  //姓名
      "gender": "女",
      "eMailAddr": "weiwei33@htsc.com",
      "rowId": "1-OXZ5",
      "menuItems": [],
      "posiItems": [//职位列表
        {
          "posiId": "1-OXZ8",//职位id
          "priFlag": "N",//是否主岗
          "posiName": "HTSC002332",//职位名称
          "posiDept": "南京长江路证券营业部"//职位部门
        },
        {
          "posiId": "1-2YVUBOX",
          "priFlag": "N",
          "posiName": "HTSC001112",
          "posiDept": "运营中心"
        },
        {
          "posiId": "1-3S0Z4",
          "priFlag": "Y",
          "posiName": "南京长江路证券营业部服务岗",
          "posiDept": "南京长江路证券营业部"
        }
      ]
    }
  };
}
