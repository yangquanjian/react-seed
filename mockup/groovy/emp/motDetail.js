exports.response = function (req, res) {
  return {
    "code": "0",
    "msg": "OK",
    "resultData": {
			"summary": "恭喜客户成功中签新股,提醒客户足额资金申购。另外可以借此机会，询问客户是否收到短信及财富通中签信息，并在此基础上完善客户信息资料及普及财富通、介绍财富通使用方法及申购基金等；增强跟客户粘性，如客户有别的需求都可以咨询。 ",
      "taskPage": {
        "pageSize": 100,
        "curPageNum": 2,
        "totalPageNum": 72,
        "totalRecordNum": 7150
      },
      "taskCustList": [
				{
					"custName": "张三",
					"custNumber": "02027754",
					"custLevel": "not retail",
					"custLevelName": "高净值客户",
					"flowId": "1131164070",
					"custType": "per",
					"custRowId": "1-EC-3695",
					"custTotalAsset": 1420444.78,
					"taskSeqDetailInfo": "客户申购的新股300536已中签！",
					"custAge": "56",
					"custGender": "男",
					"custGrade": "白金"
				},
				{
					"custName": "有限公司",
					"custNumber": "02027755",
					"custLevel": "not retail",
					"custLevelName": "高净值客户",
					"flowId": "1131164071",
					"custType": "org",
					"custRowId": "1-EC-3695",
					"custTotalAsset": 1420444.78,
					"taskSeqDetailInfo": "客户申购的新股300536已中签！需申购资金4530元! 提醒客户保证足额资金申购。",
					"custAge": null,
					"custGender": null,
					"custGrade": "白金"
				},
      ],
    }
  } 
}
