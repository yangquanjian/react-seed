/**
 * @file constants/Todo.js
 * @author yankun01
 */

import { createTypes } from 'reduxsauce'

export default createTypes(`
    ADD_TODO
    COMPLETE_TODO
    SET_VISIBILITY_FILTER

    SHOW_ALL
    SHOW_COMPLETED
    SHOW_ACTIVE
`)
