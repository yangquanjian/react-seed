exports.response = function (req, res) {
    return {
        status: 0,
        message: {
            global: "获取客户信息失败"
        },
        data: {
            // => 机构客户
            econNum: "02006619",
            custId: "1-8G-4516",
            custName: "江SSLSJTYXZRGShh29",
            custGrade: "紫金理财钻石卡客户",
            acctType: "境外一般机构",
            idType: "营业执照",
            idNum: "",
            idValDate: "",
            industry: null,
            regAsset: "0",
            regAddress: "南京市雨花台区",
            foundTime: "02/16/2017 00:00:00",
            busiArea: "测试才能",
            acctStatus: "正常",
            openTime: "07/13/2001",
            priSalesTeamId: "1-OXZ5",
            priSalesTeam: "王华",
            lastCommission: "05/20/2016 00:00:00",
        }
    };
}
