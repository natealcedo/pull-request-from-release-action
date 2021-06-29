const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');
  const baseBranches = core.getMultilineInput('base-branches');
  const titleSuffix = core.getInput('title-suffix');
  const branchSuffix = core.getInput('branch-suffix');
  const releasePrefix = core.getInput('release-prefix');
  const {payload: {repository, release}, sha} = github.context;
  const { body, tag_name } = release;

   /**
   * Check if the release matches it's release-prefix tag
   * If it does, that means this release is for the release prefix tag
   */
  if (!(tag_name).includes(releasePrefix)) {
    process.exit(0);
  }

  /**
   * 1. Create branch from release tag
   * 2. Create pull request from the tag name and match it with base branch
   */


  const octokit = github.getOctokit(token);
  const branchName = `refs/heads/${tag_name}${branchSuffix}`;
  const title = `${tag_name} ${titleSuffix}`;
  const owner = repository.owner.login;
  const repo = repository.name;

  // Remove duplicate branches
  const branches = Array.from(new Set([
    baseBranch,
    ...baseBranches
  ]));

  await octokit.rest.git.createRef({
    owner,
    repo,
    sha,
    ref: branchName
  });

  for (const branch of branches) {
    await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      base: branch,
      body,
      head: branchName
    })
  }

}

run();