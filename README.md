# uptime-status

一个基于 UptimeRobot API 的在线状态面板

An uptime status dashboard based on UptimeRobot API

------

### 基于 Cloudflare Workers 搭建 UptimeRobot API 代理，以解决官网 API 跨域问题

Build an UptimeRobot API proxy based on **Cloudflare Workers** to solve the cross-domain issue of official API

```javascript
const handleRequest = async ({
    request
}) => {
    let url = new URL(request.url);
    let body = await request.text();
    try {
        body = JSON.parse(body);
        body.api_key = '你的 UptimeRobot key'
        body = JSON.stringify(body);
    } catch (error) {
        console.log(error)
    }
    let response = await fetch('https://api.uptimerobot.com' + url.pathname, {
        body: body,
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        redirect: 'follow', // manual, *follow, error
    });

    response = new Response(response.body, response);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', '*');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token');
    response.headers.set('Access-Control-Expose-Headers', '*');
    let json = await response.text()
    try {
        json = JSON.parse(json)
        // 隐藏域名
        json.monitors = json.monitors.map(site => {
            site.url = undefined
            return site
        });
        json = JSON.stringify(json)
    } catch (error) {}
    return new Response(json, response)
}

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});
```

修改 `config.js` 中的 `ApiDomian` 为你的域名；

Modify `ApiDomian` in `config.js` to your domain;
