const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = core.getInput('token');
  const baseBranch = core.getInput('base-branch');
  const {payload: {repository, release}, sha} = github.context;
  const { body, tag_name } = release;

  console.log(JSON.stringify(github.context, null, 2));


  /**
   * Since there is no way to know which release this is for, we break down the tag name and get which partner this release is happening
   * If the parter name is not in the branch, we know this release is not for the associated base-branch
   */
  const partner = (tag_name.split('-')[0]).toLowerCase();

  if (!(baseBranch.toLowerCase()).includes(partner)) {
    process.exit(0);
  }

  /**
   * 1. Create branch from tag name
   * 2. Get name of previous release with the associated tag
   * 3. Create pull request
   */


  const octokit = github.getOctokit(token);
  const branchName = `refs/heads/${tag_name}-uat`;
  const title = `${tag_name} UAT release`;
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