exports.response = function (req, res) {
    return {
        status: 0,
        message: {
            global: "获取客户信息失败"
        },
        data: {
            id: '1',
            name: '蛋蛋猫',
            tel: '13852293974',
            weixin: 'woshiyigezhu',
            isVip: true
        }
    };
}
