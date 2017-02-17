exports.response = function (req, res) {
  return {
    status: 0,
    message: {
      global: "获取折线图信息失败"
    },
    data: [
      {
        date: '2016-06',
        money: '1200',
      },
      {
        date: '2016-07',
        money: '1600',
      },
      {
        date: '2016-08',
        money: '700',
      },
      {
        date: '2016-09',
        money: '2900',
      },
      {
        date: '2016-10',
        money: '1800',
      },
    ]
  };
};
