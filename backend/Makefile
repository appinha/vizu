LINK = \033[34m
CYAN = \033[36m
CYAN_B = \033[1;36m
GREEN = ✅ \033[32m
GREEN_B = \033[1;32m
YELLOW = \033[33m
RED_B	= \033[1;31m
ERROR = ❌ $(RED_B)ERROR:$(NC)
NC	= \033[0m

RUN = poetry run python manage.py

.PHONY: activate
activate:
	@poetry shell

all:
	$(RUN) runserver

.PHONY: migrate
migrate:
	$(RUN) migrate

.PHONY: migrations
migrations:
	$(RUN) makemigrations

.PHONY: test
test:
	poetry run pytest --durations=10

.PHONY: coverage
coverage:
	poetry run pytest --durations=10 --cov --cov-report=term --cov-report=html:./htmlcov

.PHONY: install
install:
	@echo "\n🏁 $(CYAN_B)Starting the installation process...$(NC)"

	@which pipx > /dev/null 2>&1 \
		&& (echo "\n$(GREEN)pipx found.$(NC)") \
		|| (echo "\n$(ERROR) pipx is not installed. Please install pipx by following the instructions at $(LINK)https://pipx.pypa.io/latest/$(NC)\n"; exit 1)

	@which pyenv > /dev/null 2>&1 \
		&& (echo "\n$(GREEN)pyenv found.$(NC)") \
		|| (echo "\n$(ERROR) pyenv is not installed. Please install pyenv by following the instructions at $(LINK)https://github.com/pyenv/pyenv?tab=readme-ov-file#getting-pyenv$(NC)\n"; exit 1)

	@which poetry > /dev/null 2>&1 \
		&& (echo "\n$(GREEN)poetry found.$(NC)") \
		|| (echo "\n$(ERROR) poetry is not installed. Please install poetry by following the instructions at $(LINK)https://python-poetry.org/docs/#installation$(NC)\n"; exit 1)

	@pyenv versions --bare | grep -q '3.13' \
		&& (echo "\n$(GREEN)python 3.13 found.$(NC)") \
		|| (echo "\nPython 3.13 not found. Installing it now...$(NC)" && pyenv install 3.13 && echo "\n$(GREEN)Python 3.13 installed.$(NC)")

	@echo "\nActivating virtual environment..."
	@echo "$(YELLOW)⚠️ You will need to run make install again if the virtual env is not activated yet.$(NC)\n"
	@poetry shell

	@echo "\n🛠️  Please configure your VSCode Python interpreter to use this virtualenv: $(CYAN)"
	@poetry env info --path
	@echo "$(NC)"

	@echo "⏳ Installing project dependencies..."
	@poetry install

	@echo "\n🎉 $(GREEN_B)Installation complete!$(NC) You are ready to run the Django app.\n"
