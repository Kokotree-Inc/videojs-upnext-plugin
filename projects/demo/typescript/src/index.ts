import videojs from 'video.js';
import '@kokotree-inc/videojs-upnext-plugin';

const player = videojs('video', {
  plugins: {},
  sources: [
    {
      src: 'https://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    },
    {
      src: 'https://vjs.zencdn.net/v/oceans.webm',
      type: 'video/webm'
    }
  ]
});
player.autoplay(true);

(player as any).upnext({
  interval: 10,
  headText: 'Up Next',
  cancelText: 'Cancel',
  getTitle: () => {
    return 'Ocean Life';
  },
  getVideoImageUrl: () => {
    return 'https://vjs.zencdn.net/v/oceans.png';
  },
  playNext: () => {
    console.log('playNext');
  },
  cancel: () => {
    console.log('cancel');
  }
});

player.on('ready', () => {
  console.log('ready');

  console.log(videojs.getPlugins());

  console.log('Upnext plugin version:', videojs.getPluginVersion('upnext'));
});
