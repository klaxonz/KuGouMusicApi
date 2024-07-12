const { srcappid, appid } = require('../util');

// 酷狗二维码状态检测
// 0 为二维码过期，1 为等待扫码，2 为待确认，4 为授权登录成功（4 状态码下会返回 token）
module.exports = (params, useAxios) => {
  return new Promise((resolve, reject) => {
    useAxios({
      baseURL: 'https://login-user.kugou.com',
      url: '/v2/get_userinfo_qrcode',
      method: 'GET',
      params: { plat: 4, appid, srcappid, qrcode: params?.key },
      encryptType: 'web',
      cookie: params?.cookie || {},
    }).then(resp => {
      if (resp.body?.data?.status == 4) {
        var date = new Date();
        date.setTime(date.getTime() + (1*24*60*60*1000)); // 1 day in milliseconds
        resp.cookie.push("token=" + resp.body?.data?.token + "; expires=" + date.toUTCString());
        resp.cookie.push("userid=" + resp.body?.data?.userid + "; expires=" + date.toUTCString());
      }
      resolve(resp);
    }).catch(e => reject(e));
  });
};