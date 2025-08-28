# 🚀 Argo CD Installation Guide

This guide provides step-by-step instructions to install **Argo CD** on a Kubernetes cluster using official manifests.

---

## 📌 Prerequisites

- A running **Kubernetes cluster** (v1.23+ recommended)
- `kubectl` installed and configured
- Cluster admin permissions

---

## 🛠️ Step 1: Create Namespace

First, create a dedicated namespace for Argo CD:

```bash
kubectl create namespace argocd
```

## 🛠️ Step 2: Install Argo CD

Apply the official Argo CD installation manifests:

```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

This will deploy the necessary components:

- argocd-server
- argocd-repo-server
- argocd-application-controller
- argocd-dex-server

## 🌐 Step 3: Expose the Argo CD UI

By default, the argocd-server service is of type ClusterIP. To access it externally, change it to LoadBalancer:

```bash
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
```

👉 Now you can access the Argo CD UI via the LoadBalancer's external IP.

## 🔑 Step 4: Get the Initial Admin Password

Argo CD generates a default admin password stored in a Kubernetes secret. Retrieve it using:

```bash
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d
```

**Default username:** `admin`

## 🎯 Step 5: Login to Argo CD UI

1. Open your browser and visit the LoadBalancer's external IP.
2. Login with the username `admin` and the password retrieved above.
3. (Optional but recommended) Change the admin password after first login.

---

## 📚 References

- [Argo CD Official Documentation](https://argo-cd.readthedocs.io/)
- [Argo Project GitHub](https://github.com/argoproj/argo-cd)

---

✅ You're all set! Now you can start managing your Kubernetes workloads the GitOps way with Argo CD 🎉
