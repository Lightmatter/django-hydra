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

echo "eval \"\$(pyenv init --path)\"" >> ~/.zshrc
echo "eval \"\$(pyenv init -)\"" >> ~/.zshrc
echo "eval \"\$(direnv hook zsh)\"" >> ~/.zshrc
echo "export PATH=\"\$HOME/.poetry/bin:\$PATH\"" >> ~/.zshrc

echo "${prefix}Reloading zsh"
source ~/.zshrc


echo "${prefix}Attemping to change pyenv version to 3.10.2"
pyenv global 3.10.2


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
