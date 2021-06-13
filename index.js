const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');
  const titleSuffix = core.getInput('title-suffix');
  const branchSuffix = core.getInput('branch-suffix');
  const releasePrefix = core.getInput('release-prefix');
  const {payload: {repository, release}, sha} = github.context;
  const { body, tag_name } = release;

   /**
   * Check if the release matches it's release-prefix tag
   * The constraint here is that the base branch should include the
   * release prefix
   */
  if (!(baseBranch.toLowerCase()).includes(releasePrefix)) {
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

  await octokit.rest.git.createRef({
    owner,
    repo,
    sha,
    ref: branchName
  });

  await octokit.rest.pulls.create({
    owner,
    repo,
    title,
    base: baseBranch,
    body,
    head: branchName
  })
}

run();