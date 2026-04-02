#!/bin/bash

podman run --rm -it \
  -v $(pwd):/app:Z \
  -w /app \
  -p 5173:5173 \
  node:20 \
  bash -c "npm install && npm run dev -- --host"
