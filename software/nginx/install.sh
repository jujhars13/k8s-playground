#!/bin/bash

helm upgrade --install ingress-nginx ingress-nginx \
    --repo https://kubernetes.github.io/ingress-nginx \
    --namespace ingress-nginx \
    --create-namespace \
    --values values.yaml


#helm uninstall ingress-nginx --namespace ingress-nginx \