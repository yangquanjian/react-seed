/**
 * @file createAction
 * @author maoquan(maoquan@htsc.com)
 */

export default function (type, payload = {}) {
  return { type, ...payload };
}
