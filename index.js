const core = require('@actions/core');
const github = require('@actions/github');

// try {
//   const baseBranch = core.getInput('base-branch');
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }

async function run() {
  const { sha } = github.context;
  github.context.sha

  // octokit.rest.git.createRef({
  //   owner: 'kaligo',
  //   repo: 'e2e-rewards-dashboard',
  //   ref: 'refs/heads/uat',
  //   sha: 'westpac-2021-06-07-418f56c5d'
  // })

  const context = github.context.ref;
  console.log(context)
  console.log('hello world')
}

run();

console.log('hello world')