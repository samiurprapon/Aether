# Contributing

Thank you for considering contributing to this project! This guide will walk you through the contribution process.

## General Contribution Steps

1. **Create an issue**: First, check [open issues](https://github.com/samiurprapon/Aether/issues) to see if your contribution is already being discussed. If not, feel free to create a new issue.
2. **Clone or fork the repository**:

   ```bash
   git clone https://github.com/samiurprapon/Aether.git
   ```

3. **Create your feature branch**:

   ```bash
   git checkout -b feat/new-feature main
   ```

4. **Commit your changes**:

   ```bash
   git commit -m 'feat: Add short feature description'
   ```

5. **Push to the branch**:

   ```bash
   git push origin new-feature
   ```

6. **Submit a pull request**.

- Issue Tracker: <https://github.com/samiurprapon/Aether/issues>
- Source Code: <https://github.com/samiurprapon/Aether>

## Frontend Contributions

- All frontend-related contributions should be directed to the `frontend` branch.
- Ensure you are following the existing code style and writing tests where applicable.
- Set up the project by navigating to the `frontend` directory and running:

  ```bash
  # Navigate to the frontend directory
  cd ./frontend

  # Install dependencies
  npm install

  # Run the development server
  npm run dev

  # Run tests
  npm run test

  # Build the project
  npm run build
  ```

- Before submitting a pull request

- Submit your pull requests to the `frontend` branch after confirming all tests pass.

## Backend Contributions

- All backend-related contributions should be directed to the `backend` branch.
- Follow the code structure and use TypeORM for database interaction.
- Set up the backend project by navigating to the `backend` directory and running:

  ```bash
  # Navigate to the backend directory
  cd ./backend

  # Install dependencies
  npm install

  # Run the development server
  npm run dev

  # Run tests
  npm run test

  # Build the project
  npm run build
  ```

- Before submitting a pull request to the `backend` branch, ensure that your code works with PostgreSQL or MySQL, as required.

## Android Contributions

- All Android-related contributions should be directed to the `android` branch.
- Use Android Studio for development, ensuring that the project syncs correctly with Gradle.
- Test on multiple devices and emulators before submitting a pull request.
- Pull requests should target the `android` branch.

## First Time Contributors

If you are new to open-source contributions, don’t worry! Follow the steps in the [First-Contribution Guide](./GUIDE.md) to get started.

---

Your contributions, big or small, are greatly appreciated!

This consolidated guide covers the general contribution process and adds specific instructions for each subproject. It also includes helpful references for first-time contributors while keeping everything in one `CONTRIBUTING.md` file.
