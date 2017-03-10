exports.response = function (req, res) {
  return {
    code: '0',
    msg: 'OK',
    resultData:{
      kpiList: [{
        netNewCusNumber: '253',
        netNewFLSCusNumber : '53',
        netNewGDCusNumber : '150',
        netNewCPCusNumber : '50',
        netNewCusAsset : '2202.2',
        totalNetCommission : '6.4',
        totalZHVolume : '4056.8',
        totalJCVolume : '4056.8'
      },{
        netNewCusNumber: '222',
        netNewFLSCusNumber : '222',
        netNewGDCusNumber : '150',
        netNewCPCusNumber : '50',
        netNewCusAsset : '2202.2',
        totalNetCommission : '6.4',
        totalZHVolume : '4056.8',
        totalJCVolume : '4056.8'
      },{
        netNewCusNumber: '333',
        netNewFLSCusNumber : '333',
        netNewGDCusNumber : '150',
        netNewCPCusNumber : '50',
        netNewCusAsset : '2202.2',
        totalNetCommission : '6.4',
        totalZHVolume : '4056.8',
        totalJCVolume : '4056.8'
      }]
    }
  };
}
