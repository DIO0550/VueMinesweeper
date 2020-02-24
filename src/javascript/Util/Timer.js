export const timer = {
    /**
     * 現在時刻との差分を指定したフォーマットで返す
     * @param time 時間
     * @format format フォーマット
     */
    diffTimeString(time, format) {
        let now = new Date()
        let diff = now.getTime() - time. getTime()
        if (format == TIMER_FORMAT.HOUR) {
            let second = Math.floor(diff / 1000)
            let hour =  Math.floor(second / (60 * 60))
            let minute = Math.floor(second % (60 * 60))
            second = Math.floor(minute % 60)
            minute = Math.floor(minute / 60)
            if (hour >= 100) {
                return String(hour) + ":" + ( '00' + minute ).slice( -2 ) + ":" + ( '00' + second ).slice( -2 ) 
            } else {
                return ( '00' + hour ).slice( -2 ) + ":" + ( '00' + minute ).slice( -2 ) + ":" + ( '00' + second ).slice( -2 ) 
            }
        } else if (format == TIMER_FORMAT.MINUTE) {
            let second = Math.floor(diff / 1000)
            let minute = Math.floor(second / 60)
            second = Math.floor(minute % 60)
            if (minute >= 100) {
                return String(minute) + ":" + ( '00' + second ).slice( -2 ) 
            } else {
                return ( '00' + minute ).slice( -2 ) + ":" + ( '00' + second ).slice( -2 ) 
            }
        } else if (format == TIMER_FORMAT.SECOND) {
            let second = Math.floor(diff / 1000)
            return String(second)
        } else {
            return ""
        }
    }
}

export const TIMER_FORMAT = {
    HOUR: "HH:mm:ss",
    MINUTE: "mm:ss",
    SECOND: "ss"
}