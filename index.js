const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');

  // Get repo information from the context
  // const { sha, repo: {repo, owner}, tag_name, sha} = github.context;
  const octokit = github.getOctokit(token);
  // console.log(github.context)

  /**
   * 1. Get Tag name
   * 2. Create branch from tag name
   * 3. Get name of previous release with the associated tag
   * 3. Create pull request
   */
  const release = await octokit.rest.repos.getReleaseByTag({
    owner: 'kaligo',
    repo: 'e2e-rewards-dashboard',
    tag: 'fab-2021-06-07-418f56c5d'
  })

  console.log(release)

  // const branchName = `refs/heads/${tag_name}-uat`;


  // await octokit.rest.git.createRef({
  //   owner,
  //   repo,
  //   sha,
  //   ref: branchName
  // });

  // octokit.rest.git.cre
}

run();