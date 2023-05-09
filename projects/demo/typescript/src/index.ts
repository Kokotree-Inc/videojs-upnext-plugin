import videojs from 'video.js';
import '@kokotree-inc/videojs-upnext-plugin';

const player = videojs('video', {
  plugins: {}
});
player.autoplay(true);

player.upnext({ title: 'My awesome video' });

player.on('ready', () => {
  console.log('ready');
  console.log(videojs.getPlugins());

  console.log('Upnext plugin version:', videojs.getPluginVersion('upnext'));
});
