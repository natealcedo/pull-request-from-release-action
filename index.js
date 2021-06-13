const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');

  // Get repo information from the context
  // const { sha, repo: {repo, owner}, tag_name, sha} = github.context;
  const {payload: {repository, release}, sha} = github.context;
  console.log(github.context);
  const octokit = github.getOctokit(token);
  const { body, tag_name } = release;

  /**
   * 1. Get Tag name
   * 2. Create branch from tag name
   * 3. Get name of previous release with the associated tag
   * 3. Create pull request
   */


  const branchName = `refs/heads/${tag_name}-uat`;
  const title = `${tag_name} UAT release`;
  const owner = repository.owner;
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
    body
  })
}

run();