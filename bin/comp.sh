#!/bin/bash

printf "\e[92mWhat would you like to call your component?\e[0m $1"
read NAME
NAME=${NAME:-$1}

if [ -z "$NAME" ]; then
  printf "You must provide a component name! \n";
  exit 1;
fi

FILE_PATH="./assets/components/$NAME";

printf "\e[94mCreating component in\e[0m $FILE_PATH \n";

# Create the folder
mkdir "$FILE_PATH";
# Create the component file
touch "$FILE_PATH/$NAME.jsx";

# Create the component template
echo "import React, { Component } from 'react';

export default class $NAME extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>$NAME</div>
    );
  }
}" > "$FILE_PATH/$NAME.jsx"
