#!/bin/bash
set -e
# The purpose of the prefix is to give an indication of the point
# of execution of this script, so that if something breaks it's easier
# to see where that broke.
prefix = "[LM Install Script] "


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

echo "${prefix}Installing pyenv"
brew install pyenv

echo "${prefix}Installing git"
brew install git

echo "${prefix}Installing direnv"
brew install direnv

echo "${prefix}Installing postgres"
brew install postgresql

echo "${prefix}Installing libpq-dev"
brew install libpq-dev

echo "${prefix}Installing watchman"
brew install watchman

echo "${prefix}Installing gsl"
brew install gsl


echo "${prefix}Adding pyenv, direnv, poetry and path config to .zshrc"

echo "# START LM 3.0 Configuration" >> ~/.zshrc

echo "eval \"$(pyenv init --path)\"" >> ~/.zshrc
echo "eval \"$(pyenv init -)\"" >> ~/.zshrc
echo "eval \"$(direnv hook zsh)\"" >> ~/.zshrc
echo "export PATH=\"$HOME/.poetry/bin:$PATH\"" ~/.zshrc

echo "${prefix}Sourcing .zshrc"
source ~/.zshrc


echo "${prefix}Attemping to change pyenv version to 3.10.0"
pyenv global 3.10.0


echo "${prefix}Attempting to install poetry"
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3 -


echo "${prefix}Adding postgres configuration to .zshrc"

echo "alias pg_start=\"launchctl load ~/Library/LaunchAgents\"" >> ~/.zshrc
echo "alias pg_stop=\"launchctl unload ~/Library/LaunchAgents\"" >> ~/.zshrc
echo "export PGDATA=\"/usr/local/var/postgres/\"" >> ~/.zshrc


echo "${prefix}Adding GSL config to .zshrc"

echo "export LIBRARY_PATH=/usr/local/Cellar/gsl/2.7/lib/" >> ~/.zshrc
echo "export LDFLAGS=\"-L/usr/local/opt/openssl/lib\"" >> ~/.zshrc
echo "export CPPFLAGS=\"-I/usr/local/opt/openssl/include\"" >> ~/.zshrc

echo "# END LM 3.0 Configuration" >> ~/.zshrc


echo "Provided everything in this script executed without error"
echo "You should now be setup"
