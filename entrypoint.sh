#!/bin/bash

# Vérifier et corriger les autorisations des fichiers
find /app -type f -exec chmod 644 {} \;
find /app -type d -exec chmod 755 {} \;

# Démarrer l'application
exec "$@"