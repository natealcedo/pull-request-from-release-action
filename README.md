# pull-request-from-release-action

This action helps to create a branch from a release and raises a pull request against a base branch.

# Why?
There are certain work flows where one may have a long lived branch that acts as a pre-production environment. Whenever a candidate release is created on Github, one may want to merge that release back
into a `base branch` or multiple `base-branches` and deploy that to an environment. This action automates that process.

# Usage

See [action.yml](action.yml)

Basic:
```yaml
on:
  release:
    types:
      - published

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      -  uses: actions/checkout@v2
      -  uses: actions/setup-node@v1
      -  uses: natealcedo/pull-request-from-release-action@v1
         with:
           token: ${{ secrets.TOKEN }}
           base-branch: 'branch-uat'
           base-branches:
            - 'another-branch-uat'
            - 'another-two-branch-uat'
           title-suffix: 'Release UAT'
           branch-suffix: '-UAT'
           release-prefix: 'release'
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)