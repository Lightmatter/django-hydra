import 'foundation-sites/dist/js/foundation.min';
import './csrf';
import Swup from 'swup';
import SwupGaPlugin from '@swup/ga-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

import './search'; // auto init script
import linksInit from './links';

require('jquery');

function init() {
  $(document).foundation();
  linksInit();
}

// page transitions
function swupInit() {
  // currently these are run by css only. Must add js-plugin for more advanced transitions
  const swup = new Swup({
    plugins: [new SwupPreloadPlugin(), new SwupGaPlugin()],
  });

  swup.on('contentReplaced', () => {
    // insert any scripts here that break after page transitions or use the Head plugin from Swup
    init();
  });
}

$(document).ready(() => {
  init();
  swupInit();
});
