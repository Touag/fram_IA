/**
 * Path transformation utilities for IDE installer standardization
 *
 * Provides utilities to convert hierarchical paths to flat naming conventions.
 *
 * DASH-BASED NAMING (new standard):
 * - Agents: sedona-agent-module-name.md (with sedona-agent- prefix)
 * - Workflows/Tasks/Tools: sedona-module-name.md
 *
 * Example outputs:
 * - cis/agents/storymaster.md → sedona-agent-cis-storymaster.md
 * - bmm/workflows/plan-project.md → sedona-bmm-plan-project.md
 * - bmm/tasks/create-story.md → sedona-bmm-create-story.md
 * - core/agents/brainstorming.md → sedona-agent-brainstorming.md (core agents skip module name)
 * - standalone/agents/fred.md → sedona-agent-standalone-fred.md
 */

const AGENT_SEGMENT = 'agents';

// SEDONA installation folder name - centralized constant for all installers
const SEDONA_FOLDER_NAME = '_sedona';

/**
 * Convert hierarchical path to flat dash-separated name (NEW STANDARD)
 * Converts: 'bmm', 'agents', 'pm' → 'sedona-agent-bmm-pm.md'
 * Converts: 'bmm', 'workflows', 'correct-course' → 'sedona-bmm-correct-course.md'
 * Converts: 'core', 'agents', 'brainstorming' → 'sedona-agent-brainstorming.md' (core agents skip module name)
 * Converts: 'standalone', 'agents', 'fred' → 'sedona-agent-standalone-fred.md'
 *
 * @param {string} module - Module name (e.g., 'bmm', 'core', 'standalone')
 * @param {string} type - Artifact type ('agents', 'workflows', 'tasks', 'tools')
 * @param {string} name - Artifact name (e.g., 'pm', 'brainstorming')
 * @returns {string} Flat filename like 'sedona-agent-bmm-pm.md' or 'sedona-bmm-correct-course.md'
 */
function toDashName(module, type, name) {
  const isAgent = type === AGENT_SEGMENT;

  // For core module, skip the module name: use 'sedona-agent-name.md' instead of 'sedona-agent-core-name.md'
  if (module === 'core') {
    return isAgent ? `sedona-agent-${name}.md` : `sedona-${name}.md`;
  }
  // For standalone module, include 'standalone' in the name
  if (module === 'standalone') {
    return isAgent ? `sedona-agent-standalone-${name}.md` : `sedona-standalone-${name}.md`;
  }

  // Module artifacts: sedona-module-name.md or sedona-agent-module-name.md
  // eslint-disable-next-line unicorn/prefer-string-replace-all -- regex replace is intentional here
  const dashName = name.replace(/\//g, '-'); // Flatten nested paths
  return isAgent ? `sedona-agent-${module}-${dashName}.md` : `sedona-${module}-${dashName}.md`;
}

/**
 * Convert relative path to flat dash-separated name
 * Converts: 'bmm/agents/pm.md' → 'sedona-agent-bmm-pm.md'
 * Converts: 'bmm/agents/tech-writer/tech-writer.md' → 'sedona-agent-bmm-tech-writer.md' (uses folder name)
 * Converts: 'bmm/workflows/correct-course.md' → 'sedona-bmm-correct-course.md'
 * Converts: 'core/agents/brainstorming.md' → 'sedona-agent-brainstorming.md' (core agents skip module name)
 *
 * @param {string} relativePath - Path like 'bmm/agents/pm.md'
 * @returns {string} Flat filename like 'sedona-agent-bmm-pm.md' or 'sedona-brainstorming.md'
 */
function toDashPath(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') {
    // Return a safe default for invalid input
    return 'sedona-unknown.md';
  }

  // Strip common file extensions to avoid double extensions in generated filenames
  // e.g., 'create-story.xml' → 'create-story', 'workflow.md' → 'workflow'
  const withoutExt = relativePath.replace(/\.(md|yaml|yml|json|xml|toml)$/i, '');
  const parts = withoutExt.split(/[/\\]/);

  const module = parts[0];
  const type = parts[1];
  let name;

  // For agents, if nested in a folder (more than 3 parts), use the folder name only
  // e.g., 'bmm/agents/tech-writer/tech-writer' → 'tech-writer' (not 'tech-writer-tech-writer')
  if (type === 'agents' && parts.length > 3) {
    // Use the folder name (parts[2]) as the name, ignore the file name
    name = parts[2];
  } else {
    // For non-nested or non-agents, join all parts after type
    name = parts.slice(2).join('-');
  }

  return toDashName(module, type, name);
}

/**
 * Create custom agent dash name
 * Creates: 'sedona-custom-agent-fred-commit-poet.md'
 *
 * @param {string} agentName - Custom agent name
 * @returns {string} Flat filename like 'sedona-custom-agent-fred-commit-poet.md'
 */
function customAgentDashName(agentName) {
  return `sedona-custom-agent-${agentName}.md`;
}

/**
 * Check if a filename uses dash format
 * @param {string} filename - Filename to check
 * @returns {boolean} True if filename uses dash format
 */
function isDashFormat(filename) {
  return filename.startsWith('sedona-') && filename.includes('-');
}

/**
 * Extract parts from a dash-formatted filename
 * Parses: 'sedona-agent-bmm-pm.md' → { prefix: 'sedona', module: 'bmm', type: 'agents', name: 'pm' }
 * Parses: 'sedona-bmm-correct-course.md' → { prefix: 'sedona', module: 'bmm', type: 'workflows', name: 'correct-course' }
 * Parses: 'sedona-agent-brainstorming.md' → { prefix: 'sedona', module: 'core', type: 'agents', name: 'brainstorming' } (core agents)
 * Parses: 'sedona-brainstorming.md' → { prefix: 'sedona', module: 'core', type: 'workflows', name: 'brainstorming' } (core workflows)
 * Parses: 'sedona-agent-standalone-fred.md' → { prefix: 'sedona', module: 'standalone', type: 'agents', name: 'fred' }
 * Parses: 'sedona-standalone-foo.md' → { prefix: 'sedona', module: 'standalone', type: 'workflows', name: 'foo' }
 *
 * @param {string} filename - Dash-formatted filename
 * @returns {Object|null} Parsed parts or null if invalid format
 */
function parseDashName(filename) {
  const withoutExt = filename.replace('.md', '');
  const parts = withoutExt.split('-');

  if (parts.length < 2 || parts[0] !== 'sedona') {
    return null;
  }

  // Check if this is an agent file (has 'agent' as second part)
  const isAgent = parts[1] === 'agent';

  if (isAgent) {
    // This is an agent file
    // Format: sedona-agent-name (core) or sedona-agent-standalone-name or sedona-agent-module-name
    if (parts.length >= 4 && parts[2] === 'standalone') {
      // Standalone agent: sedona-agent-standalone-name
      return {
        prefix: parts[0],
        module: 'standalone',
        type: 'agents',
        name: parts.slice(3).join('-'),
      };
    }
    if (parts.length === 3) {
      // Core agent: sedona-agent-name
      return {
        prefix: parts[0],
        module: 'core',
        type: 'agents',
        name: parts[2],
      };
    } else {
      // Module agent: sedona-agent-module-name
      return {
        prefix: parts[0],
        module: parts[2],
        type: 'agents',
        name: parts.slice(3).join('-'),
      };
    }
  }

  // Not an agent file - must be a workflow/tool/task
  // If only 2 parts (sedona-name), it's a core workflow/tool/task
  if (parts.length === 2) {
    return {
      prefix: parts[0],
      module: 'core',
      type: 'workflows', // Default to workflows for non-agent core items
      name: parts[1],
    };
  }

  // Check for standalone non-agent: sedona-standalone-name
  if (parts[1] === 'standalone') {
    return {
      prefix: parts[0],
      module: 'standalone',
      type: 'workflows', // Default to workflows for non-agent standalone items
      name: parts.slice(2).join('-'),
    };
  }

  // Otherwise, it's a module workflow/tool/task (sedona-module-name)
  return {
    prefix: parts[0],
    module: parts[1],
    type: 'workflows', // Default to workflows for non-agent module items
    name: parts.slice(2).join('-'),
  };
}

/**
 * Resolve the skill name for an artifact.
 * Prefers canonicalId from a sedona-skill-manifest.yaml sidecar when available,
 * falling back to the path-derived name from toDashPath().
 *
 * @param {Object} artifact - Artifact object (must have relativePath; may have canonicalId)
 * @returns {string} Filename like 'sedona-create-prd.md' or 'sedona-agent-bmm-pm.md'
 */
function resolveSkillName(artifact) {
  if (artifact.canonicalId) {
    return `${artifact.canonicalId}.md`;
  }
  return toDashPath(artifact.relativePath);
}

module.exports = {
  toDashName,
  toDashPath,
  resolveSkillName,
  customAgentDashName,
  isDashFormat,
  parseDashName,
  AGENT_SEGMENT,
  SEDONA_FOLDER_NAME,
};
