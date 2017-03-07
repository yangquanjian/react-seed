exports.response = function (req, res) {
  return {
    "code": "0",
    "msg": "OK",
    "resultData": {
			"motTaskList":
        {
          "pageSize": 5,
          "totalPages": 2,
          "totalRecords": 10,
          "pageNum": 1,
          "taskCustList": [
          {
            "custName": "张三",
            "custNumber": "0000001",
            "custLevel": "not retail",
            "custLevelName": "高净值客户",
            "custTotalAsset": 1000000,
            "taskSeqDetailInfo": <p>客户生日提醒</p>,
          },
          {
            "custName": "阿诺德.斯瓦辛格.斯皮尔伯格数千万企业用户年降费总额将近40亿元",
            "custNumber": "0000001",
            "custLevel": "not retail",
            "custLevelName": "高净值客户",
            "custTotalAsset": 1000000,
            "taskSeqDetailInfo": <p>3月5日公布的政府工作报告提出，今年网络提速降费要迈出更大步伐，年内全部取消手机国内长途和漫游费，大幅降低中小企业互联网专线接入资费，降低国际长途电话费，推动“互联网+”深入发展、促进数字经济加快成长，让企业广泛受益、群众普遍受惠。</p> ,
          },
          {
            "custName": "张三",
            "custNumber": "0000001",
            "custLevel": "not retail",
            "custLevelName": "高净值客户",
            "custTotalAsset": 1000000,
            "taskSeqDetailInfo": <p>工信部信息通信发展司司长闻库曾表示，2015年三大运营商因提速降费少收了400亿元，按照13亿用户计算，一年我国平均每人每月省2.6元。随着新一轮提速降费的启动，用户将资费将可进一步节省。但这对电信运营商利润是否继续产生影响？
              中国移动集团公司总经理李跃表示，降低长途漫游费用对收入和利润的影响是一个动态的过程，资费的下降，会激发客户需求，实现“薄利多销”。中国移动将进一步挖掘管理潜力，推动降本增效。同时，确保网络质量投入成本不降低，对客户服务的成本不降低。
              中国联通集团公司总经理陆益民也表示，取消长途漫游费对管理体制和对整个公司的运营确实会产生一定的影响，但对中国联通影响不会太大，希望通过公司业务创新转型、产品优化升级，未来面向信息服务产业的云计算、大数据、物联网等各个新型业务的发展弥补这部分损失。</p>,
          },
        ]
        }
    }
  };
};
