# config.py

import os

# Configuración de HashiCorp Vault
VAULT_URL = ''  # URL de Vault (http://127.0.0.1:8200)
VAULT_TOKEN = ''     # Root token de Vault

# Configuración de la clave secreta para AES
# Quitar el comentario de la línea siguiente para generar una clave aleatoria
#SECRET_KEY = os.urandom(32)  # AES-256
