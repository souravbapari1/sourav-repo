#!/bin/bash

# Ensure this script stops if any command fails
set -e

# Optionally, print out the argument to see which script is being run
echo "Running script: $1"

# Check which script to run
case "$1" in
  "dev")
    echo "Starting development server with turbopack..."
    next dev --turbopack
    ;;
  "build")
    echo "Building the application..."
    next build
    ;;
  "start")
    echo "Starting the application..."
    next start
    ;;
  "lint")
    echo "Running linting..."
    next lint
    ;;
  "backend")
    echo "Starting backend in watch mode with bun..."
    bun --watch run src/backend/main.ts
    ;;
  "migrate")
    echo "Running Prisma migration..."
    prisma migrate dev --name "$2"  # Pass the name as the second argument
    ;;
  "validate:schema")
    echo "Validating Prisma schema..."
    node schema.js
    ;;
  "backend:routes")
    echo "Importing backend routes..."
    bun ./auto/routesimport.ts
    ;;
  *)
    echo "Unknown command: $1"
    exit 1
    ;;
esac
