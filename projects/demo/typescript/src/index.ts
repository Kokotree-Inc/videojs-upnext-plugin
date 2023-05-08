// import { VideoJsUpnext } from '@kokotree-inc/videojs-upnext-plugin';
// import videojs from 'video.js';

// videojs.registerPlugin('upnext', VideoJsUpnext);
// const player = videojs('myvideo');
// player.upnext();
// player.src('https://cdn.api.video/vod/vi5oDagRVJBSKHxSiPux5rYD/hls/manifest.m3u8');

import videojs from 'video.js';
// import '@kokotree-inc/videojs-upnext-plugin';
// import './example-plugin.ts';
// import '../../../../../videojs-upnext-plugin/projects/plugin/src/example-plugin.ts';
// import 'videojs-seek-buttons';
import '@kokotree-inc/videojs-upnext-plugin';

console.log(videojs.getPlugins());

const player = videojs('video', {
  plugins: {}
});
player.autoplay(true);

// const options: VideoJsUpnextPluginOptions = {
//   label: 'LLL',
//   message: 'MMM'
// };
player.upnext({ title: 'My awesome video', interval: 50 });

player.on('ready', () => {
  console.log('ready');
  console.log(videojs.getPlugins());
});
