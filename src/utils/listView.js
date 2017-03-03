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
 * @param {string|bool} sectionTitle section标题
 *
 * @return {ListView.DataSource}
 */
export const prepareDataSource = (data, sectionTitle = false) => {
  const sectionIDs = ['s0'];
  const rowIDs = [];
  const dataBlob = {
    s0: sectionTitle ? { title: sectionTitle } : {},
  };
  if (!_.isEmpty(data)) {
    rowIDs.push(
      data.map(
        (item, index) => {
          const rowID = `s0-r${index}`;
          dataBlob[rowID] = item;
          return `r${index}`;
        },
      ),
    );
  } else if (sectionTitle) {
    // 为了保证头能渲染，这里插入一个空行，然后在renderRow中作一个特殊判断
    rowIDs.push([{}]);
  } else {
    rowIDs.push([]);
  }
  return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
};
