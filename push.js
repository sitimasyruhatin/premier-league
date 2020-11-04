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
    'https://fcm.googleapis.com/fcm/send/cPHgnMyrdfQ:APA91bEH8h5yycJa0butWPMrJN9ccLOgYVS10khoEEph7b4hUFtpLAe7ylwcFg_S6ZWRPV27tU-U8gsSILu-OCaH3LWs_NhHUDINPDtm6WfDDbqVjWOpNkIrpz7weNh6AuPtxJO7l0al',
  keys: {
    p256dh:
      'BLdxdwZnIQJsGrl5SWC4KE04UB3zzj3alkCqhB3OmDf6VxGsUZxymmvPnU96UxFopTEE2GvEvahrnljl1WWmdmI=',
    auth: 'LsNUf1vCCCtvNFuykm7XhQ==',
  },
};
var payload = 'MU : 2 vs EVE : 3 ';

var options = {
  gcmAPIKey: '614304657531',
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
