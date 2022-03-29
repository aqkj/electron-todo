"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysList = exports.EDAY_TYPE = exports.ETODO_STATUS = void 0;
var ETODO_STATUS;
(function (ETODO_STATUS) {
    ETODO_STATUS[ETODO_STATUS["PENDING"] = 0] = "PENDING";
    ETODO_STATUS[ETODO_STATUS["COMPLETE"] = 1] = "COMPLETE";
})(ETODO_STATUS = exports.ETODO_STATUS || (exports.ETODO_STATUS = {}));
/**
 * 日期类型
 */
var EDAY_TYPE;
(function (EDAY_TYPE) {
    /** 周日 */
    EDAY_TYPE[EDAY_TYPE["SUNDAY"] = 0] = "SUNDAY";
    /** 周一 */
    EDAY_TYPE[EDAY_TYPE["MONDAY"] = 1] = "MONDAY";
    /** 周二 */
    EDAY_TYPE[EDAY_TYPE["TUESDAY"] = 2] = "TUESDAY";
    /** 周三 */
    EDAY_TYPE[EDAY_TYPE["WEDNESDAY"] = 3] = "WEDNESDAY";
    /** 周四 */
    EDAY_TYPE[EDAY_TYPE["THURSDAY"] = 4] = "THURSDAY";
    /** 周五 */
    EDAY_TYPE[EDAY_TYPE["FRIDAY"] = 5] = "FRIDAY";
    /** 周六 */
    EDAY_TYPE[EDAY_TYPE["SATURDAY"] = 6] = "SATURDAY";
})(EDAY_TYPE = exports.EDAY_TYPE || (exports.EDAY_TYPE = {}));
exports.daysList = [{
        label: '周日',
        value: EDAY_TYPE.SUNDAY
    }, {
        label: '周一',
        value: EDAY_TYPE.MONDAY
    }, {
        label: '周二',
        value: EDAY_TYPE.TUESDAY
    }, {
        label: '周三',
        value: EDAY_TYPE.WEDNESDAY
    }, {
        label: '周四',
        value: EDAY_TYPE.THURSDAY
    }, {
        label: '周五',
        value: EDAY_TYPE.FRIDAY
    }, {
        label: '周六',
        value: EDAY_TYPE.SATURDAY
    }];
