
import hmac
import json
def get_signature():
    # data = {"hello": "worlds"}
    secret_key = 'blah'
    data = {"hello": "worlds"}

    encoded_secret = secret_key.encode('utf-8')
    encoded_data = json.dumps(data).encode('utf-8')

    print("encoded secret *********** ", encoded_secret)
    print("encoded data *********** ", encoded_data)

    # data_to_sign = '&'.join([f'{key}={value}' for key, value in data.items()])

    signature = hmac.new(encoded_secret, encoded_data, 'sha256').hexdigest()
    print(signature) 