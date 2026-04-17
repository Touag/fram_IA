const prompts = require('./prompts');

const CLIUtils = {
  /**
   * Display SEDONA logo and version using @clack intro + box
   */
  async displayLogo() {
    const color = await prompts.getColor();
    const termWidth = process.stdout.columns || 80;

    // Full "SEDONA" ASCII art logo for wide terminals
    const logoWide = [
      ' ███████╗███████╗██████╗  ██████╗ ███╗   ██╗ █████╗  ™',
      ' ██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔══██╗  ',
      ' ███████╗█████╗  ██║  ██║██║   ██║██╔██╗ ██║███████║  ',
      ' ╚════██║██╔══╝  ██║  ██║██║   ██║██║╚██╗██║██╔══██║  ',
      ' ███████║███████╗██████╔╝╚██████╔╝██║ ╚████║██║  ██║  ',
      ' ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝  ',
    ];

    // Compact "SEDONA" for narrow terminals
    const logoNarrow = [
      ' ███████╗███████╗██████╗  ██████╗ ███╗   ██╗ █████╗ ™',
      ' ██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔══██╗',
      ' ███████╗█████╗  ██║  ██║██║   ██║██╔██╗ ██║███████║',
      ' ╚════██║██╔══╝  ██║  ██║██║   ██║██║╚██╗██║██╔══██║',
      ' ███████║███████╗██████╔╝╚██████╔╝██║ ╚████║██║  ██║',
      ' ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝',
    ];

    const logoLines = termWidth >= 80 ? logoWide : logoNarrow;

    // Sedona red/orange gradient effect using available colors
    const logo = logoLines
      .map((line, i) => {
        if (i < 2) return color.red(line);
        if (i < 4) return color.yellow(line);
        return color.white(line);
      })
      .join('\n');

    const tagline =
      color.dim('  ─────────────────────────────────────────────────────\n') +
      color.white('  AI Companion · Enterprise Automation · Smarter CI/CD\n') +
      color.dim('  ─────────────────────────────────────────────────────');

    await prompts.box(`${logo}\n\n${tagline}`, '', {
      contentAlign: 'left',
      rounded: true,
      formatBorder: color.red,
    });
  },

  /**
   * Display module configuration header
   * @param {string} moduleName - Module name (fallback if no custom header)
   * @param {string} header - Custom header from module.yaml
   * @param {string} subheader - Custom subheader from module.yaml
   */
  async displayModuleConfigHeader(moduleName, header = null, subheader = null) {
    const title = header || `Configuring ${moduleName.toUpperCase()} Module`;
    await prompts.note(subheader || '', title);
  },
};

module.exports = { CLIUtils };
