exports.response = function (req, res) {
    return {
			code: "0",
			msg: "OK",
			resultData: {
            // => 个人客户
            isSuccess: true,
            customerInfoPer: {
                custId: "1-DU-5288",
                custName: "1-DU-5288",
                custGender: "男",
                custAge: "52",
                custGrade: "紫金理财金卡客户",
                idType: "身份证",
                idNum: "1-DU-5288",
                idValDate: "03/05/2026",
                job: "(旧)办事人员及有关人员",
                degree: "博士",
                degreeCode: "110001",
                merriage: "已婚",
                merriageCode: "108020",
                hobits: ["娱乐"],
                acctStatus: "正常",
                openTime: "04/22/1996",
                priSalesTeamId: "1-OXZ5",
                priSalesTeam: "1-OXZ5",
                lastCommission: "08/30/2016",
                childCount: "1",
                noPhone: "Y",
                noSms: "N",
            },
				    customerInfoOrg:{
              custId: "1-DU-5288",
							custName: "1-DU-5288",
							acctType: "资金理财机构客户机构资金理财机构客户机构",
							industry: "装备制造行业销售餐饮行业理财服务机构及融机构",
							custAge: "52",
							custGrade: "紫金理财金卡客户",
							idType: "身份证",
							idNum: "1-DU-5288",
							idValDate: "03/05/2026",
							job: "(旧)办事人员及有关人员",
							degree: "博士",
							degreeCode: "110001",
							merriage: "已婚",
							merriageCode: "108020",
							hobits: ["娱乐"],
							acctStatus: "正常",
							openTime: "04/22/1996",
							priSalesTeamId: "1-OXZ5",
							priSalesTeam: "1-OXZ5",
							lastCommission: "08/30/2016",
							childCount: "1",
							noPhone: "Y",
							noSms: "N",
            }
        }
    };
}