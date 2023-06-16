
## Vite TypeScript React Node.js Docker Self-hosted Runner Template

This GitHub repository is a template site that allows you to quickly start a project with the following technologies:

- **Frontend**:
  - Vite - a fast build tool for modern web applications
  - TypeScript - a typed programming language for JavaScript
  - React - a JavaScript library for building user interfaces
  - SCSS

- **Backend**:
  - Node.js - a JavaScript runtime environment for server-side development
  - Docker - a container deployment platform
  - GitHub Actions - a continuous integration and deployment (CI/CD) service
  - Self-hosted Runner - a locally hosted GitHub Actions execution agent

### Getting Started

To use this template, you can click on the "Use this template" button on the GitHub repository page. After creating your own repository from the template, you can follow the steps below to start developing your site:

1. **Frontend**:
   - Navigate to the `frontend` directory.
   - Install the dependencies by running `npm install`.
   - Start the development server with hot reloading by running `npm run dev`.

2. **Backend**:
   - Navigate to the `backend` directory.
   - Install the dependencies by running `npm install`.
   - Customize the backend code to fit your project's requirements.

3. **Deployment**:
   - Set up a self-hosted runner on your server by following the GitHub Actions documentation.
   - Update the deployment workflow file (`./.github/workflows/deploy.yml`) with your deployment configuration.
   - Push your changes to the repository, and the deployment workflow will be triggered automatically.

   
## Workflow Setup

To properly configure your workflow, here are some crucial steps:

1. **Creating a Self-hosted Runner**:
   - To create a self-hosted runner, you will need to follow the GitHub Actions documentation. A self-hosted runner is a server that you host, and it listens for available GitHub Actions jobs. This runner can be used for more efficient job processing and to gain access to specific hardware or software requirements that GitHub-hosted runners might not support.

2. **Setting up the Server Root Directory**:
   - Create a `www` directory in the root of your server. This directory will serve as the root for your website or application, and it is where your built project will reside after deployment. Be sure to grant necessary permissions to this directory for the runner's user.

3. **Adjusting the Deployment Configuration**:
   - Your `deploy.yml` file will contain some lines similar to:
     ```
     working-directory: /home/user/www
     run: cp -R backend/* /home/user/www
     ```
     These lines tell GitHub Actions where to find your project's files and where to copy the backend files. Make sure to replace `/home/user/www` with the path to the `www` directory on your server and `user` with your current server user account. 

After this setup, push your changes to the repository. The deployment workflow should automatically trigger and start executing on your self-hosted runner.


### Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Contributions are welcome!

### License

This template site is open-source and available under the [MIT License](LICENSE). Feel free to use it as a starting point for your own projects.
