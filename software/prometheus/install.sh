#!/bin/bash

helm upgrade --install prometheus prometheus \
  --repo https://prometheus-community.github.io/helm-charts \
  --namespace prometheus --create-namespace


export POD_NAME=$(kubectl get pods \
    --namespace prometheus \
    -l "app=prometheus,component=server" \
    -o jsonpath="{.items[0].metadata.name}")

kubectl --namespace prometheus \
    port-forward $POD_NAME 9090


# Get the PushGateway URL by running these commands in the same shell:
export POD_NAME=$(kubectl get pods --namespace prometheus -l "app=prometheus-pushgateway,component=pushgateway" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace prometheus port-forward $POD_NAME 9091
