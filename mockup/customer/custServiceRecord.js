exports.response = function (req, res) {
  return {
    status: 0,
    message: {
      global: "获取服务列表失败"
    },
    data: {
      isSuccess: true,
      serviceRecords: [
        {
          custId: "1-VS-4517",
          custType: "per",
          action: "new",
          category: "System Alert", 
          comments: "comment",
          desp: "desp",
          startTime: "01/05/2017 10:20:22",
          endTime: "01/05/2017 10:20:22",
          ownerId: "1-OXZ5",
          status: "Done",
          type: "213894",
          actionChannel: "HTSC Phone",
          priority: "",
          ani: "",
          serviceChannel: "",
          serviceType: "",
          serviceContent: "",
          serviceRecord: "",
          eventFlowId: "",
          doneFlag: ""
        },
        {
          custId: "1-SD-2345",
          custType: "org",
          action: "new",
          category: "System Alert System Alert ",
          comments: "comment ",
          desp: "desp",
          startTime: "01/05/2017 10:20:22",
          endTime: "01/05/2017 10:20:22",
          ownerId: "1-OXZ5",
          status: "Done",
          type: "commentcommentcommentc",
          actionChannel: "HTSC Phone",
          priority: "",
          ani: "",
          serviceChannel: "",
          serviceType: "",
          serviceContent: "",
          serviceRecord: "",
          eventFlowId: "",
          doneFlag: ""
        },
        {
          custId: "1-VB-8990",
          custType: "per",
          action: "new",
          category: "System Alert",
          comments: "comment",
          desp: "desp",
          startTime: "01/05/2017 10:20:22",
          endTime: "01/05/2017 10:20:22",
          ownerId: "1-OXZ5",
          status: "Done",
          type: "213894",
          actionChannel: "HTSC Phone",
          priority: "",
          ani: "",
          serviceChannel: "",
          serviceType: "",
          serviceContent: "",
          serviceRecord: "",
          eventFlowId: "",
          doneFlag: ""
        },
      ]
    },
  };
}
