exports.response = function (req, res) {
    return {
			code: "0",
			msg: "OK",
			resultData: {
            // => 机构客户
            isSuccess: true,
            customerInfoOrg: {
                econNum: "03057624",
                custId: "1-8G-3347",//客户id
                custName: "南京雨花园林绿化工程有限公司",
                custGrade: "紫金理财金卡客户",
                acctType: "未知",
                idType: "营业执照",
                idNum: "3201142300963",
                idValDate: "",
                industry: "(旧)未知",
                regAsset: "0",
                regAddress: "南京市",
                foundTime: "",
                busiArea: "未知",
                acctStatus: "正常",
                openTime: "09/06/2007",
                priSalesTeamId: "1-OURA",
                priSalesTeam: "1-OURA",
                lastCommission: "08/30/201600: 00: 00",
            }
        }
    };
}
