import {addDays, format, subDays} from "date-fns";

export function setCookie(name: string, value: any, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


export function eraseCookie(name: string) {
    setCookie(name, "", -1);
}

export function number_format(number: any, decimals?: any, dec_point?: any, thousands_sep?: any) {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;

    var t = thousands_sep == undefined ? "," : thousands_sep,
        s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j: number = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
}


export function goBack() {
    window.history.back();
}

export function goBack2() {
    window.history.go(-2);
}

export function format_slice(str: number) {
    if (str === 0) {
        return str
    } else {
        return str.toFixed(1)
    }
}


export function getLocalDateTime(_date: number | string, format: "dd_mm_yyyy" | "dd/mm/yyyy" | "dd-mm-yyyy" | "dd-mm-yyyy, hh:m_m:ss" | "dd/mm/yyyy, hh:m_m" | "yyyy-mm-dd hh:m_m:ss" | "yyyy-mm-dd") {
    const date = new Date(_date);
    const D = date.getDate();
    const hh = date.getHours();
    const m_m = date.getMinutes();
    const ss = date.getSeconds();

    const M = date.getMonth() + 1;
    const dd = D < 10 ? "0" + D : D;
    const mm = M < 10 ? "0" + M : M;
    const min = m_m === 0 ? "00" : m_m;
    const yyyy = date.getFullYear();

    let result: string = format;
    result = result.replace("D", D.toString());
    result = result.replace("M", M.toString());
    result = result.replace("dd", dd.toString());
    result = result.replace("mm", mm.toString());
    result = result.replace("yyyy", yyyy.toString());
    result = result.replace("hh", hh.toString());
    result = result.replace("m_m", min.toString());
    result = result.replace("ss", ss.toString());

    return result
}

export function slug(str: string) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}

export function convertBaseDate(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export function convertDate(timestamp: number) {
    var months_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var convdataTime = day + ' thg ' + month + ', ' + year;
    return convdataTime;
}

export function convertDatetime(timestamp: number) {
    var months_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds()
    var convdataTime = day + ' thg ' + month + ', ' + year + ' - ' + hours + ':' + minutes.substr(-2)
    return convdataTime;
}

export function formatNumberPhone(number_phone: string) {
    return number_phone.replace(
        /(^(?:\d{2}))?(\d{3})(?=(?:\d{5})+$)/g,
        '$1.$2.'
    );
}

export function convertToLocalDate(utcTime: any) {
    const time: number = new Date(utcTime).getTime() / 1000 + 7 * 60 * 60
    return convertDatetime(time)
}

export function convertToLocalDate2(utcTime: any) {
    const time: number = new Date(utcTime).getTime() / 1000
    return convertDatetime(time)
}

export function timeAccept(utcTime: any) {
    const time: number = new Date(utcTime).getTime() / 1000 + 7 * 60 * 60 + 2 * 24 * 60 * 60
    return convertDatetime(time)
}

export function convertToDate(utcTime: any) {
    const time: number = new Date(utcTime).getTime() / 1000 + 7 * 60 * 60
    return convertDate(time)
}

export function mentionTime(utcTime: any) {
    const time: number = new Date(utcTime).getTime() / 1000 + 7 * 60 * 60 + 4 * 24 * 60 * 60
    return convertDatetime(time)
}

export const toNumber = (number: any, x = 3, n = 0) => {
    if (!number) {
        return 0;
    }
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
export const numberWithCommas = (x: any) => {
    x = x.toString().replace(/[.]/g, "");
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
        x = x.replace(pattern, "$1.$2");
    }
    return x;
};
export const formatDate = (time: any) => {
    const split = time.join(",");
    return new Date(split);
}

export function countJoinDate(time: number) {
    const createdAt = new Date(time).getTime()
    const now = new Date().getTime();
    const distance = now - createdAt
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (days < 1) {
        return "Today"
    }
    if (days >= 1 && days < 30) {
        return days + (days == 1 ? " day" : " days") + " ago"
    }
    if (days > 30 && days < 365) {
        let month = Math.floor(days / 30);
        return month + (month == 1 ? " month" : " months") + " ago"
    }
    if (days >= 365) {
        let year = Math.floor(days / 365)
        return year + (year == 1 ? " year" : " years") + " ago"
    }
}


export function localDateTime(dateTimeString: string) {
    if (dateTimeString == "" || dateTimeString == undefined) {
        return ""
    }
    let dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString()
}

export function localDate(dateTimeString: string) {
    if (dateTimeString == "" || dateTimeString == undefined) {
        return ""
    }
    let dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString()
}


export function getDateString(date?: Date): string {
    return date ? format(date, "yyyy-MM-dd") : ""
}

export function getToDay(): Date {
    return new Date()
}


export function plusDays(date: Date, day: number): Date {
    return addDays(date, day)
}


export function minusDays(date: Date, day: number): Date {
    return subDays(date, day);
}


export function parserDateFromSecond(timestamp: number): Date {
    return new Date(timestamp * 1000);
}

export function parserDateFromMiliSecond(timestamp: number): Date {
    return new Date(timestamp);
}


