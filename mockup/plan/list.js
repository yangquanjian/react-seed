exports.response = function (req, res) {
    return {
        totalCount: 2,
        list: [
            {
                id: "1",
                name: "推广计划1"
            },
            {
                id: "2",
                name: "推广计划2"
            },
        ]
    }
}
