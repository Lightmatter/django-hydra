#!/bin/zsh
set -e
# The purpose of the prefix is to give an indication of the point
# of execution of this script, so that if something breaks it's easier
# to see where that broke.
prefix="[LM Install Script] "

# Credit, Taken from: https://stackoverflow.com/a/34389425
# Installs homebrew if it does not exist, or updates it if it does.
which -s brew
if [[ $? != 0 ]] ; then
    echo "${prefix}Installing homebrew"
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo "${prefix}Updating homebrew"
    brew update
fi

echo "${prefix}Installing node"
brew install node

echo "${prefix}Installing node version manager (nvm)"
brew install nvm

echo "${prefix}Installing pyenv"
brew install pyenv

echo "${prefix}Attemping to change pyenv version to 3.11.1"
pyenv install 3.11.1
pyenv global 3.11.1

echo "${prefix}Installing git"
brew install git

echo "${prefix}Installing direnv"
brew install direnv

echo "${prefix}Installing postgres"
brew install postgresql

echo "${prefix}Installing libpq"
brew install libpq

echo "${prefix}Installing watchman"
brew install watchman

echo "${prefix}Adding pyenv, direnv, poetry and path config to .zshrc"

echo "# START LM 3.0 Configuration" >> ~/.zshrc
echo "NVM_DIR=~/.nvm" >> ~/.zshrc
echo "eval \"source \$(brew --prefix nvm)/nvm.sh\"" >> ~/.zshrc
echo "eval \"\$(pyenv init --path)\"" >> ~/.zshrc
echo "eval \"\$(pyenv init -)\"" >> ~/.zshrc
echo "eval \"\$(direnv hook zsh)\"" >> ~/.zshrc
echo "export WORKON_HOME=\"~/.virtualenvs\"" >> ~/.zshrc
echo "export PATH=\"\$HOME/.local/bin:\$PATH\"" >> ~/.zshrc

echo "${prefix}Reloading zsh"
source ~/.zshrc

echo "${prefix}Attempting to change nvm version to v16.14.0(default)"
nvm install v16.14.0
nvm alias default v16.14.0
nvm use default

echo "${prefix}Attempting to install poetry"
curl -sSL https://install.python-poetry.org | python3 -

echo "# END LM 3.0 Configuration" >> ~/.zshrc

echo "${prefix}Reloading zsh"
source ~/.zshrc

echo "${prefix}Creating default DB for postgres"

db_name=$(whoami)

if psql -lqt | cut -d \| -f 1 | grep -qw "${db_name}"; then
    echo "${prefix}Database ${db_name} already exists, skipping creation."
else
    echo "${prefix}Database ${db_name} does not exist, creating."
    createdb "${db_name}"
fi

echo "Provided everything in this script executed without error"
echo "You should now be setup"
echo "You should check your ~/.zshrc"
echo "Important: Now that you have completed the fresh machine setup, you should begin to setup the project."
echo "If you are in an existing project, that is! You can do this with /scripts/setup_existing_project.sh"
