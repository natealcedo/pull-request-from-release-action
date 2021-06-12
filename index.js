const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');
  const { sha,repo: {repo, owner}, } = github.context;
  const octokit = github.getOctokit(token);

  const result = await octokit.rest.repos.get({
    owner: 'kaligo',
    repo: 'e2e-rewards-dashboard'
  });
  console.log(baseBranch)
}

run();