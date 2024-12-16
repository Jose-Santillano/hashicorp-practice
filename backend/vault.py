import hvac
from config import VAULT_URL, VAULT_TOKEN

# Inicializar el cliente de Vault
client = hvac.Client(url=VAULT_URL, token=VAULT_TOKEN)

def store_in_vault(path: str, data: dict):
    """
    Almacena los datos cifrados en Vault.
    """
    try:
        client.secrets.kv.v2.create_or_update_secret(path=path, secret=data)
        print(f"Datos almacenados correctamente en {path}")
    except hvac.exceptions.VaultError as e:
        print(f"Error al almacenar los secretos en Vault: {e}")

def get_from_vault(path: str) -> dict:
    """
    Recupera los datos almacenados en Vault.
    """
    try:
        secret = client.secrets.kv.v2.read_secret_version(path=path)
        return secret['data']['data']
    except hvac.exceptions.VaultError as e:
        print(f"Error al recuperar los secretos de Vault: {e}")
        return {}
