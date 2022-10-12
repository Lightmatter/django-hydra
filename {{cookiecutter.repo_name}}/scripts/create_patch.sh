{%- raw -%}
#!/bin/bash

#run from base of project folder.
if [ $# -eq 1 ]; then
    if ! [ `git cat-file -t "$1"` = "commit" ]; then
        echo "$1"' is not a git commit'
        exit
    fi
    PATCH_COMMIT=$1
    # if base commit not included, use commit preceding patch commit
    BASE_COMMIT=`git rev-parse "$PATCH_COMMIT"^1`
elif [ $# -eq 2 ]; then
    PATCH_COMMIT=$1
    BASE_COMMIT=$2
else
    PATCH_COMMIT=`git rev-parse HEAD`
    BASE_COMMIT=`git rev-parse "$PATCH_COMMIT"^1`
fi

PROJECT_NAME="${PWD##*/}"
PATCH_NAME="$PROJECT_NAME"_"$PATCH_COMMIT"".diff"
PATCH_TMP_PATH="/tmp/""$PATCH_NAME"
git diff "$BASE_COMMIT" "$PATCH_COMMIT" > "$PATCH_TMP_PATH"

sed -i 's/'"$PROJECT_NAME"'/{{cookiecutter.repo_name}}/g' "$PATCH_TMP_PATH"

mv "$PATCH_TMP_PATH" ../django-hydra/
echo "Patch created successfully!"
pushd ../django-hydra/
git apply --ignore-space-change --ignore-whitespace --directory=\{\{cookiecutter.repo_name\}\} "$PATCH_NAME" --reject --index
if [ $? -eq 0 ]
then
    rm "$PATCH_NAME"
    popd
    echo "Successfully backported patch"
else
    echo "could not apply patch cleanly"
fi
{%- endraw -%}
