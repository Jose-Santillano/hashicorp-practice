from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
from config import SECRET_KEY

def encrypt_data(data: str) -> str:
    """
    Cifra los datos con AES en modo CBC.
    """
    cipher = AES.new(SECRET_KEY, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data.encode(), AES.block_size))
    iv = base64.b64encode(cipher.iv).decode('utf-8')
    ct = base64.b64encode(ct_bytes).decode('utf-8')
    return iv + ':' + ct  # IV + texto cifrado

def decrypt_data(encrypted_data: str) -> str:
    """
    Descifra los datos con AES en modo CBC.
    """
    iv, ct = encrypted_data.split(':')
    iv = base64.b64decode(iv)
    ct = base64.b64decode(ct)
    cipher = AES.new(SECRET_KEY, AES.MODE_CBC, iv)
    pt = unpad(cipher.decrypt(ct), AES.block_size)
    return pt.decode()
