const formatTime = (inputTime: string): string => {
    const now = new Date();
    const pastTime = new Date(inputTime);

    // 计算时间差（毫秒）
    const timeDiff = now.getTime() - pastTime.getTime();

    // 转换为小时、分钟、秒
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);

    // 小于24小时
    if (secondsDiff < 0) {
        return `0秒前`
    } else if (secondsDiff < 60) {
        return `${secondsDiff}秒前`
    } else if (minutesDiff < 60) {
        return `${minutesDiff}分钟前`
    } else if (hoursDiff < 24) {
        return `${hoursDiff}小时前`;
    } else {
        // 大于24小时，格式化为“yyyy年MM月dd日 hh:mm:ss发布”
        const year = pastTime.getFullYear();
        const month = padZero(pastTime.getMonth() + 1); // 月份从0开始
        const day = padZero(pastTime.getDate());
        const hours = padZero(pastTime.getHours());
        const minutes = padZero(pastTime.getMinutes());
        const seconds = padZero(pastTime.getSeconds());

        return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    }
}

// 辅助函数：补零
function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

export default { formatTime };