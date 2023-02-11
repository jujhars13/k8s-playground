#!/bin/bash
docker build --tag $(minikube ip):5000/test-img .