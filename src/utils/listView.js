import _ from 'lodash';
import { ListView } from 'antd-mobile';

export const dataSource = new ListView.DataSource({
  getSectionHeaderData(data, sectionID) {
    return data[sectionID];
  },
  getRowData(data, sectionID, rowID) {
    return data[sectionID + '-' + rowID];
  },
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  },
  sectionHeaderHasChanged(s1, s2) {
    return s1 !== s2;
  },
})

/**
 * 根据列表数据，生成ListView可用的dataSource
 *
 * @param {Array|Object} listData 列表数据
 * @param {string=} sectionTitle section标题
 */
export const prepareDataSource = (listData) => {
  const sectionIDs = ['s0'];
  const rowIDs = [];
  let dataBlob = {
    s0: {},
  };
  if (!_.isEmpty(listData)) {
    rowIDs.push(
      listData.map(
        (item, index) => {
          let rowID = `s0-r${index}`
          dataBlob[rowID] = item;
          return `r${index}`;
        }
      )
    )
  }
  else {
    rowIDs.push([]);
  }
  return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
}
