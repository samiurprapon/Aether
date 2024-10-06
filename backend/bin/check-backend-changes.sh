#!/bin/sh

# Check if there are changes in the ./backend directory
if git diff --cached --name-only | grep -q '^backend/'; then
  echo "Changes detected in ./backend directory. Running Husky..."

  npx lint-staged
  exit 0
else
  echo "No changes in ./backend directory. Skipping Husky..."
  exit 1
fi