
#generate private key
ssh-keygen -t rsa -b 4096

#generate .pem file from private key
openssl rsa -in "private_key_filename" -pubout -outform PEM -out "public_key_output_filename"