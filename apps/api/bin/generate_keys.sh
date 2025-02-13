#!/bin/bash

# Create the certs directory if it doesn't exist
mkdir -p certs

# check if openssl is installed
if ! [ -x "$(command -v openssl)" ]; then
  echo 'Error: openssl is not installed.' >&2
  exit 1
fi

# check if public.pem and private.pem already exist
# ask the user if they want to overwrite them if answer is yes then overwrite, else say already exist
# else create the keys
if [ -f "certs/public.pem" ] && [ -f "certs/private.pem" ]; then
  echo "Public and private keys already exist. Do you want to overwrite them? (yes/no)"
  read -r response
  if [ "$response" = "yes" ]; then
    # Generate the private key
    openssl ecparam -name prime256v1 -genkey -noout | openssl pkcs8 -topk8 -nocrypt -out certs/private.pem

    # Extract the public key from the private key
    openssl ec -in certs/private.pem -pubout -out certs/public.pem
  else
    echo "Public and private keys already exist. Exiting..."
    exit 0
  fi
else

  # Generate the private key
  openssl ecparam -name prime256v1 -genkey -noout | openssl pkcs8 -topk8 -nocrypt -out certs/private.pem

  # Extract the public key from the private key
  openssl ec -in certs/private.pem -pubout -out certs/public.pem

  echo "Semmetric key pair generated and saved in the ./certs directory."
fi


