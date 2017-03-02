exports.response = function (req, res) {
    return {
			code: "0",
			msg: "OK",
			resultData:{
				  isSuccess: true,
				  custBaseInfo: {
					  econNum: "03057624",
					  custName: "南京雨花园林绿化工程有限公司",
					  totAsset: "67.10",
					  custGrade: "紫金理财金卡客户",
					  lastCommission: "",
					  gender: null,
					  age: null,
					  acctType: "未知",
					  industry: "(旧)未知"
					},
				  orgCustomerContactInfoList: [
						{},
						{
							custId: null,
							custSor: null,
							custNumber: null,
							custType: null,
							name: "test-number-1-test-number-1-test-number-1-test-number-1-test-number-1-test-number-1",
							custRelaCd: "206050",
							custRela: "机构客户联系人机构客户联系人机构客户联系人机构客户联系人机构客户联系人机构客户联系人机构客户联系人",
							rowId: "CONTA-20170107-01418207865",
							mainFlag: false,
							validFlag: true,
							gender: null,
							idAddress: null,
							homeAddresses: null,
							workAddresses: null,
							otherAddresses: null,
							cellPhones: [],
							workTels: [
								{
									mainFlag: false,
									contactType: "104120",
									contactValue: "88888888",
									rowId: "COMMI-20170107-04824803699",
									validFlag: true
								}
							],
							homeTels: [
								{
									mainFlag: false,
									contactType: "104121",
									contactValue: "85454545",
									rowId: "COMMI-20170107-04824803698",
									validFlag: true
								}
							],
							otherTels: [],
							emailAddresses: [],
							qqNumbers: [],
							wechatNumbers: [],
						},
						{
							custId: null,
							custSor: null,
							custNumber: null,
							custType: null,
							name: "test-number-1",
							custRelaCd: "206050",
							custRela: "机构客户联系人",
							rowId: "CONTA-20170107-01418207865",
							mainFlag: false,
							validFlag: true,
							gender: null,
							idAddress: null,
							homeAddresses: null,
							workAddresses: null,
							otherAddresses: null,
							cellPhones: [],
							workTels: [
								{
									mainFlag: false,
									contactType: "104120",
									contactValue: "88888888",
									rowId: "COMMI-20170107-04824803699",
									validFlag: true
								}
							],
							homeTels: [
								{
									mainFlag: false,
									contactType: "104121",
									contactValue: "85454545",
									rowId: "COMMI-20170107-04824803698",
									validFlag: true
								}
							],
							otherTels: [],
							emailAddresses: [],
							qqNumbers: [],
							wechatNumbers: [],
						},
					]
				}
    };
}
