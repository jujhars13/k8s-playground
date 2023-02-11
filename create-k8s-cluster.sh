#!/bin/bash
# create a minikube cluster
# use a VM as opposed to local docker node so we can mess with
# ebpf kernely stuff like cillum

minikube delete

# install kvm
# see https://help.ubuntu.com/community/KVM/Installation
# sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
# sudo adduser $(id -un) libvirt
# virt-host-validate
minikube start --driver=kvm2 --addons registry headlamp ingress