#!/bin/bash
if [ "$HEROKU_ENV" == true ]; then
    npm run build
fi
