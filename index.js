const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');
  const titleSuffix = core.getInput('title-suffix');
  const branchSuffix = core.getInput('branch-suffix');
  const {payload: {repository, release}, sha} = github.context;
  const { body, tag_name } = release;

  /**
   * Since there is not way to know which branch we want to merge this release back into, we break the tag name and check if the base branch includes this tag
   * If the tag name is not in the base branch, we know this release is not for the associated base-branch
   */
  const partner = (tag_name.split('-')[0]).toLowerCase();

  if (!(baseBranch.toLowerCase()).includes(partner)) {
    process.exit(0);
  }

  /**
   * 1. Create branch from tag name
   * 2. Create branch
   * 3. Create
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