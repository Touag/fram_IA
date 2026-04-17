const path = require('node:path');
const prompts = require('../prompts');
const { Installer } = require('../core/installer');
const { Manifest } = require('../core/manifest');
const { UI } = require('../ui');

const installer = new Installer();
const manifest = new Manifest();
const ui = new UI();

module.exports = {
  command: 'status',
  description: 'Display SEDONA installation status and module versions',
  options: [],
  action: async (options) => {
    try {
      // Find the sedona directory
      const projectDir = process.cwd();
      const { sedonaDir } = await installer.findBmadDir(projectDir);

      // Check if sedona directory exists
      const fs = require('../fs-native');
      if (!(await fs.pathExists(sedonaDir))) {
        await prompts.log.warn('No SEDONA installation found in the current directory.');
        await prompts.log.message(`Expected location: ${sedonaDir}`);
        await prompts.log.message('Run "sedona install" to set up a new installation.');
        process.exit(0);
        return;
      }

      // Read manifest
      const manifestData = await manifest._readRaw(sedonaDir);

      if (!manifestData) {
        await prompts.log.warn('No SEDONA installation manifest found.');
        await prompts.log.message('Run "sedona install" to set up a new installation.');
        process.exit(0);
        return;
      }

      // Get installation info
      const installation = manifestData.installation || {};
      const modules = manifestData.modules || [];

      // Check for available updates (only for external modules)
      const availableUpdates = await manifest.checkForUpdates(sedonaDir);

      // Display status
      await ui.displayStatus({
        installation,
        modules,
        availableUpdates,
        sedonaDir,
      });

      process.exit(0);
    } catch (error) {
      await prompts.log.error(`Status check failed: ${error.message}`);
      if (process.env.SEDONA_DEBUG) {
        await prompts.log.message(error.stack);
      }
      process.exit(1);
    }
  },
};
