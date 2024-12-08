# Backend for the Vizu app

This is a regular Django project. Basic install instructions are as follows:

1. install [pipx](https://pipx.pypa.io/latest/)
2. install [pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#getting-pyenv)
3. install [poetry](https://python-poetry.org/docs/#installation). It's basically just `pipx install poetry`
4. using pyenv, install python version 3.13: `pyenv install 3.13`
5. `cd` into the `backend` folder
6. run `poetry shell`. This will create and activate a virtualenv with the correct python version for you
7. run `poetry env info --path` and copy the result. Configure vscode's python virtualenv to point to this path
8. run `poetry install`. This is the basic equivalent of `npm install`, which you should also run every time there's a new package you don't have already installed

Now you're all set to actually run and test Django:

1. start Django either by running the `runserver` vscode debug configuration or by running `poetry run manage.py runserver` inside the `backend` folder
2. open your browser, go to `localhost:8000/api`
3. if everything goes right, you should receive an HTTP response with a message. Hurray!
