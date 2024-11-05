import bcrypt

def create_password(raw):
    # 使用bcrypt加密
    raw = raw.encode('utf-8')
    hashed = bcrypt.hashpw(raw, bcrypt.gensalt(10))
    # save hashed as a string in database
    hashed = hashed.decode('utf-8')
    return hashed

def compare_password(check,hashed):
    check = check.encode('utf-8')
    hashed = hashed.encode('utf-8')
    if bcrypt.checkpw(check, hashed):
        return True
    else:
        return False