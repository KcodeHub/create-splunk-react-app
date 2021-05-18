# create-splunk-react-app

Enter this directory and run `yarn start` to view the app:

Output will be like below:

![create-splunk-react-app demo](app.jpeg)

Splunk Log Server

![splunk-log-server](splunk.jpeg)

## Available Scripts

Install Yarn to build project.
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### Note
1. Fix Index.js file in node_module : splunk-sdk as below:

`
try {
    process.env = process.env || {};
   } catch (e) {
}
`
