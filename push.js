var webPush = require('web-push');

const vapidKeys = {
  publicKey:
    'BF8iIRBhLjpEDx2S32XdlndjL5-Id1v7E1LFB2uVghlSIUBpX1NL7IkuWmFTkZJHlD4EgD8atJHy9Oqd9ep2sQ8',
  privateKey: 'CtByW_npXdooHHsAvWAoyNx_PhBmG7Dndodt70D0kxA',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/cRkF5SmEp8o:APA91bF2TEegSkwrxAVBAqYJ6wIdLWdJszJeVKSA4yabPcFvVfWLmtX1omsbwhD_S9gj0l5it5lNLOc6V2xErgEtGuGKYGEXEg8Z9_VmCqib6k2VXkMOO76SBpdRXEOAHuuCDqUOl3B9',
  keys: {
    p256dh:
      'BAyAjP9ase4l7XL+/JKmKk7d9L17b1V8gKAA5ZUOAeLT+FV/x65a0HYJ5nCP1VGurgGWv3Ou8kUeJdbObl36n5o=',
    auth: 'jjO9tW078SDfqHPWPrGXeA==',
  },
};
var payload = 'MU : 2 vs EVE : 3 ';

var options = {
  gcmAPIKey: '614304657531',
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
