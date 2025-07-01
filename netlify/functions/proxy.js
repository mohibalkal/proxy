const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing url'
    };
  }

  // إعداد الهيدرات المطلوبة
  const headers = {
    'origin': 'https://moviebox.ng',
    'referer': 'https://moviebox.ng',
  };
  if (event.headers['range']) {
    headers['range'] = event.headers['range'];
  }
  if (event.headers['user-agent']) {
    headers['user-agent'] = event.headers['user-agent'];
  }

  try {
    const videoRes = await fetch(decodeURIComponent(url), {
      headers,
    });

    // تمرير الهيدرات المهمة فقط للمتصفح
    const resHeaders = {};
    const allowedHeaders = [
      'content-type', 'content-length', 'accept-ranges', 'content-range',
      'content-disposition', 'cache-control', 'pragma', 'expires', 'last-modified', 'etag'
    ];
    for (const [key, value] of videoRes.headers.entries()) {
      if (allowedHeaders.includes(key.toLowerCase())) {
        resHeaders[key] = value;
      }
    }
    // تأكيد Content-Type
    if (!resHeaders['content-type']) {
      resHeaders['content-type'] = 'video/mp4';
    }

    const buffer = await videoRes.buffer();

    return {
      statusCode: videoRes.status,
      headers: resHeaders,
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Proxy error: ' + e.message
    };
  }
};
