const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');

  // Get repo information from the context
  // const { sha, repo: {repo, owner}, tag_name, sha} = github.context;
  console.log(github.context);
  const octokit = github.getOctokit(token);

  /**
   * 1. Get Tag name
   * 2. Create branch from tag name
   * 3. Get name of previous release with the associated tag
   * 3. Create pull request
   */
  // const release = await octokit.rest.repos.getReleaseByTag({
  //   owner,
  //   repo,
  //   tag: tag_name
  // })

  // const prBody = release.data.body;

  // const branchName = `refs/heads/${tag_name}-uat`;
  // const title = `${tag_name} UAT release`;


  // await octokit.rest.git.createRef({
  //   owner,
  //   repo,
  //   sha,
  //   ref: branchName
  // });

  // await octokit.rest.pulls.create({
  //   owner,
  //   repo,
  //   title,
  //   base: baseBranch,
  //   body: prBody
  // })

  // console.log('done');
}

run();