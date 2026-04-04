from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

# Clave secreta para firmar tokens (cámbiala en producción)
SECRET_KEY = "gimnasio_secret_key_2024"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Encriptar contraseña
def hash_password(password: str):
    return pwd_context.hash(password)

# Verificar contraseña
def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

# Crear token JWT
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Leer token JWT
def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None