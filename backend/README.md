# Backend for the Vizu app

This is a regular Django project.

## Usage

### 1. Install dependencies

Simply run `make install` and follow the instructions on the terminal.

Or, if you prefer to manually install, the instructions are as follows:

1. Install [pipx](https://pipx.pypa.io/latest/).
2. Install [pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#getting-pyenv).
3. Install [poetry](https://python-poetry.org/docs/#installation). It's basically just `pipx install poetry`.
4. Using `pyenv`, install python version 3.13: `pyenv install 3.13`.
5. `cd` into the `backend` folder.
6. Run `poetry shell`. This will create and activate a virtualenv with the correct python version for you.
7. Run `poetry env info --path` and copy the result. Configure vscode's python virtualenv to point to this path.
8. Run `poetry install`. This is the basic equivalent of `npm install`, which you should also run every time there's a new package you don't have already installed.

### 2. Run server

Now you're all set to actually run and test Django:

1. Start Django either by running the `runserver` VS Code debug configuration or by running `make` inside the `backend` folder.
2. Open your browser and go to `localhost:8000/api`.
3. If everything goes right, you should receive an HTTP response with a message. Hurray!
