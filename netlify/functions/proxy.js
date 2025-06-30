const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing url'
    };
  }
  try {
    const videoRes = await fetch(decodeURIComponent(url), {
      headers: {
        'origin': 'https://moviebox.ng',
        'referer': 'https://moviebox.ng',
      },
    });
    if (!videoRes.ok) {
      return {
        statusCode: videoRes.status,
        body: 'Failed to fetch video'
      };
    }
    const headers = {
      'Content-Type': videoRes.headers.get('content-type') || 'video/mp4',
      'Accept-Ranges': videoRes.headers.get('accept-ranges') || 'bytes',
      'Content-Length': videoRes.headers.get('content-length') || ''
    };
    const buffer = await videoRes.buffer();
    return {
      statusCode: 200,
      headers,
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
