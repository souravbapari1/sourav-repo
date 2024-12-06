#!/bin/bash

# Ensure this script stops if any command fails
set -e

# Print usage instructions
usage() {
  echo "Usage: $0 {dev|build|start|lint|backend|migrate|validate:schema|backend:routes|dev:backend}"
  echo "Commands:"
  echo "  dev             - Start the development server with Turbopack"
  echo "  build           - Build the application"
  echo "  start           - Start the application"
  echo "  lint            - Run linting"
  echo "  backend         - Start backend in watch mode with bun"
  echo "  migrate <name>  - Run Prisma migration with specified name"
  echo "  validate:schema - Validate Prisma schema"
  echo "  backend:routes  - Import backend routes"
  echo "  dev:backend     - Start both backend and dev in separate terminal windows"
}

# Function to start backend and frontend in separate terminals
start_dev_backend() {
  # Check for terminal emulator availability
  if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "echo 'Starting backend...'; bun --watch run src/backend/main.ts; bash" &
    gnome-terminal -- bash -c "echo 'Starting frontend...'; npm run dev --turbopack; bash" &
  elif command -v xfce4-terminal &> /dev/null; then
    xfce4-terminal --hold -e "bash -c 'echo Starting backend...; bun --watch run src/backend/main.ts'" &
    xfce4-terminal --hold -e "bash -c 'echo Starting frontend...; npm run dev --turbopack'" &
  elif command -v konsole &> /dev/null; then
    konsole --hold -e bash -c "echo 'Starting backend...'; bun --watch run src/backend/main.ts" &
    konsole --hold -e bash -c "echo 'Starting frontend...'; npm run dev --turbopack" &
  else
    echo "Error: No compatible terminal emulator found (gnome-terminal, xfce4-terminal, or konsole)."
    exit 1
  fi
}

# Command runner
run_command() {
  case "$1" in
    "dev")
      echo "Starting development server with Turbopack..."
      npm run dev --turbopack
      ;;
    "build")
      echo "Building the application..."
      npm run build
      ;;
    "start")
      echo "Starting the application..."
      npm run start
      ;;
    "lint")
      echo "Running linting..."
      npm run lint
      ;;
    "backend")
      echo "Starting backend in watch mode with bun..."
      bun --watch run src/backend/main.ts
      ;;
    "migrate")
      if [[ -z "$2" ]]; then
        echo "Migration name is required."
        usage
        exit 1
      fi
      echo "Running Prisma migration..."
      prisma migrate dev --name "$2"
      ;;
    "validate:schema")
      echo "Validating Prisma schema..."
      node schema.js
      ;;
    "backend:routes")
      echo "Importing backend routes..."
      bun ./auto/routesimport.ts
      ;;
    "dev:backend")
      echo "Starting backend and frontend in separate terminal windows..."
      start_dev_backend
      ;;
    *)
      echo "Unknown command: $1"
      usage
      exit 1
      ;;
  esac
}

# Ensure the user provided at least one argument
if [[ $# -lt 1 ]]; then
  echo "Error: Missing command."
  usage
  exit 1
fi

# Run the appropriate command
run_command "$@"
