// ============================================
// SOCIAL MEDIA PIXELS - Prestigia Yacht Dubai
// Add your pixel IDs below
// ============================================

// --- Facebook/Meta Pixel ---
// Replace 'YOUR_FB_PIXEL_ID' with your actual Facebook Pixel ID
/*
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_FB_PIXEL_ID');
fbq('track', 'PageView');
*/

// --- TikTok Pixel ---
// Replace 'YOUR_TIKTOK_PIXEL_ID' with your actual TikTok Pixel ID
/*
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdSession"],
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.src=i,n.async=!0,n.onload=n.onreadystatechange=function(){var t=this.readyState;if(!t||"complete"===t||"loaded"===t){try{ttq.ready();ttq.page()}catch(e){}}};o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)};
  ttq.load('YOUR_TIKTOK_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
*/

// --- Google Analytics (GA4) ---
// Replace 'YOUR_GA_MEASUREMENT_ID' with your actual GA4 Measurement ID (e.g., G-XXXXXXXXXX)
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_GA_MEASUREMENT_ID');
(function(){
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=YOUR_GA_MEASUREMENT_ID';
  document.head.appendChild(s);
})();
*/

// --- Snapchat Pixel ---
// Replace 'YOUR_SNAP_PIXEL_ID' with your actual Snapchat Pixel ID
/*
!function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);}(window,document,'https://sc-static.net/scevent.min.js');
snaptr('init', 'YOUR_SNAP_PIXEL_ID');
snaptr('track', 'PAGE_VIEW');
*/

// --- X (Twitter) Pixel ---
// Replace 'YOUR_TWITTER_PIXEL_ID' with your actual Twitter Pixel ID
/*
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,s));}(window,document,'script');
twq('init','YOUR_TWITTER_PIXEL_ID');
twq('track','PageView');
*/

// ============================================
// To activate a pixel:
// 1. Uncomment the pixel code block above
// 2. Replace the placeholder ID with your real Pixel ID
// 3. Save this file
// ============================================
