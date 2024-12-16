from flask import Flask, request, jsonify
from encryption import encrypt_data, decrypt_data
from vault import store_in_vault, get_from_vault
from flask_cors import CORS

# Inicializar la aplicación Flask
app = Flask(__name__)

# Habilitar CORS para todas las rutas
CORS(app)

@app.route('/store_config', methods=['POST'])
def store_config():
    """
    Recibe los datos del frontend, los cifra y los almacena en HashiCorp Vault.
    """
    # Recibir los datos del frontend
    config_data = request.json
    print(f"Datos recibidos: {config_data}")  # Depuración: Imprimir los datos recibidos

    # Cifrar los datos
    encrypted_data = {
        key: encrypt_data(value) for key, value in config_data.items()
    }
    print(f"Datos cifrados: {encrypted_data}")  # Depuración: Imprimir los datos cifrados

    # Almacenar los datos cifrados en Vault
    store_in_vault('secret/database_jose', encrypted_data)

    return jsonify({"message": "Configuration stored successfully!"})

@app.route('/get_config', methods=['GET'])
def get_config():
    """
    Recupera los datos cifrados de Vault y los descifra.
    """
    # Recuperar los datos cifrados desde Vault
    encrypted_data = get_from_vault('secret/database_jose')
    print(f"Datos cifrados recuperados: {encrypted_data}")  # Depuración: Imprimir los datos recuperados

    if not encrypted_data:
        return jsonify({"error": "No data found"}), 404  # Error si no se encuentran datos

    # Descifrar los datos
    decrypted_data = {
        key: decrypt_data(value) for key, value in encrypted_data.items()
    }
    print(f"Datos descifrados: {decrypted_data}")  # Depuración: Imprimir los datos descifrados

    return jsonify(decrypted_data)

if __name__ == '__main__':
    app.run(debug=True)

