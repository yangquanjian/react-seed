/**
 * @file utils/listView
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';
import { ListView } from 'antd-mobile';

export const dataSource = new ListView.DataSource({
  getSectionHeaderData(data, sectionID) {
    return data[sectionID];
  },
  getRowData(data, sectionID, rowID) {
    return data[`${sectionID}-${rowID}`];
  },
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  },
  sectionHeaderHasChanged(s1, s2) {
    return s1 !== s2;
  },
});

/**
 * 根据列表数据，生成ListView可用的dataSource
 *
 * @param {Array|Object} data 列表数据
 *
 * @return {ListView.DataSource}
 */
export const prepareDataSource = (data) => {
  const listData = _.isFunction(data.toJS) ? data.toJS() : data;
  const sectionIDs = ['s0'];
  const rowIDs = [];
  const dataBlob = {
    s0: {},
  };
  if (!_.isEmpty(listData)) {
    rowIDs.push(
      listData.map(
        (item, index) => {
          const rowID = `s0-r${index}`;
          dataBlob[rowID] = item;
          return `r${index}`;
        },
      ),
    );
  } else {
    rowIDs.push([]);
  }
  return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
};
