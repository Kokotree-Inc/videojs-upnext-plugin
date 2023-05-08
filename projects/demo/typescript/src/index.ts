import videojs from 'video.js';
import '@kokotree-inc/videojs-upnext-plugin';

// console.log(videojs.getPlugins());

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
  // console.log(videojs.getPlugins());
});
