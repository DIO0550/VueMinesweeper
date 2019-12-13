
/**
 * 計算系
 */
var CalcUtil = {
    numberPlace(target, place) {
        if (place == 1) {
            return target % 10;
        }
        
        var length = String(target).length;
        var divide_value = Math.pow(10, place)

        if (length == place) {
            return Math.floor(target / (divide_value / 10));
        }

        var result = target % divide_value;
        result = Math.floor(result / (divide_value / 10));

        return result;
    }
};

export default CalcUtil;