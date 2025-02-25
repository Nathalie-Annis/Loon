let [req, rsp] = [$request, JSON.parse($response.body || '{}')];

runs().catch((err) => {
  console.log(`[BahamutAnime] ERROR: ${err.message||err}`)
}).finally(() => $done({
  body: JSON.stringify(rsp)
}));

async function runs() {
  if (req.url.includes('token.php')) {
    if (rsp.ad) {
      rsp.ad.minor = [];
      rsp.ad.major = [];
    }
    if (rsp.data && rsp.data.ad) {
      rsp.data.ad.minor = [];
      rsp.data.ad.major = [];
    }  
  }
  if (req.url.includes('m3u8.php') && (rsp.message || rsp.error)) {
    await adURL('');
    $notification.post("動畫瘋","开始观看广告","[温馨提示]可以切屏做其他事","crazyanime://",0)
    await new Promise(r => setTimeout(r, 25000));
    $notification.post("動畫瘋","结束观看广告","[点我跳转]开始愉快的观影吧!","crazyanime://",0)
    await adURL('end');
    rsp = await playURL();
  }
}

function adURL(str) {
  return new Promise((res) => {
    get({
      url: `https://api.gamer.com.tw/mobile_app/anime/v1/stat_ad.php?ad=${str}&schedule=0&sn=${req.url.split(/sn=(\d+)/i)[1]}`,
      headers: req.headers
    }, (err, resp, data) => res())
  })
}

function playURL() {
  return new Promise((res) => {
    get({
      url: req.url,
      headers: req.headers
    }, (err, resp, data) => res(JSON.parse(data || '{}')))
  })
}

function get(options, callback) {
  if (typeof $task != "undefined") {
    $task.fetch(options).then(response => {
      response["status"] = response.statusCode
      callback(null, response, response.body)
    }, reason => callback(reason.error, null, null))
  }
  if (typeof $httpClient != "undefined") {
    $httpClient.get(options, callback)
  }
}
