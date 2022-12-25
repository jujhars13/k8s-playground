# K8s playground

Used for things such as service mesh and ebpf experiments

## Start Minikube k8s cluster

Use a VM as opposed to local docker based deployment so we can mess with ebpf kernely stuff like cillum.

```bash

./create-k8s-cluster.sh

# check k8s is working
minikube kubectl -- get pods -A
```

## Terraformy bit

```bash

(cd deploy && terraform init)
(cd deploy && terraform apply)
(cd deploy && terraform destroy)
```