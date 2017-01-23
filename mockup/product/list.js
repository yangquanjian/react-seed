exports.response = function (req, res) {
  let data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: '相约酒店',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '麦当劳邀您过周末',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: '食惠周',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
  const result = [];
  for(let i = 0; i < 20; i++) {
    result.push(data[i % data.length]);
  }
  return {
    status: 0,
    message: {
      global: "获取产品列表失败"
    },
    data: result
  };
}
