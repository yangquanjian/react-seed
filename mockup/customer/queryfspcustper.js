exports.response = function (req, res) {
    return {
        status: 0,
        message: {
            global: "获取客户信息失败"
        },
        data: {
            // => 个人客户
            custId: "1-EX-807",
            custName: "何YjP15",
            custGender: "女",
            custAge: "54",
            custGrade: "紫金理财钻石卡客户",
            idType: "身份证",
            idNum: "320105196309291424",
            idValDate: "04/10/2027",
            job: "(旧)生产、运输设备操作人员及有关人员",
            degree: "其他",
            degreeCode: "110999",
            merriage: "未婚",
            merriageCode: "108010",
            hobits: [
                "汽车"
            ],
            acctStatus: "正常",
            openTime: "10/20/1995",
            priSalesTeamId: "1-OXZ5",
            priSalesTeam: "王华",
            lastCommission: "09/26/2016",
            childCount: "4",
            noPhone: "N",
            noSms: "Y"
        }
    };
}
