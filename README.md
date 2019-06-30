# [Block World][Live Site]

Automatic block stacking using [logic][Logic Programming].<br>
It is developed primarily with [React][React], and [Cosmos][Cosmos]!

Visit the [site][Live Site].

View the [cosmos][Live Cosmos].

## Setup

### Required Software

- [Yarn Package Manager][Yarn]
- [AWS CLI][AWS CLI Install] (only required for deployment)

### Installing Dependencies

`yarn`

This command will download the required dependencies for the project.

## Development

### Viewing Locally

`yarn start`

This command will build and serve a local copy of the website.

### Developing Components

`yarn cosmos`

This command runs [Cosmos][Cosmos], the tool used for isolated component development.

### Running Tests

`yarn test`

This command aliases [jest][Jest], the tool used for testing component behaviours.

### Deploying Changes

`yarn deploy`

This command will run the tests; build the app; and upload the new build to AWS S3.<br>
(This command requires the AWS CLI tool to be [installed][AWS CLI Install] and [configured][AWS CLI Configure] correctly.)


[Logic Programming]: https://en.wikipedia.org/wiki/Logic_programming
[Yarn]: https://yarnpkg.com/en/docs/install
[Live Site]: https://blockworld.jamiebray.me/
[Live Cosmos]: https://cosmos.blockworld.jamiebray.me/
[React]: https://reactjs.org/
[Cosmos]: https://github.com/react-cosmos/react-cosmos
[AWS CLI Install]: https://docs.aws.amazon.com/cli/latest/userguide/
[AWS CLI Configure]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
