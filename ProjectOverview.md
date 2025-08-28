# 📊 Expense Tracker App - Complete Development Journey

## 📌 Project Overview

This is an **Expense Tracker App** that I built using the **MEN stack** (**M**ongoDB, **E**xpress, and **N**ode.js). While it may not be a groundbreaking project, it holds great importance for me because it helped me understand the **complete development lifecycle**, which I previously found confusing.

Whenever I watched CI/CD tutorials on YouTube, I often felt underconfident. I could follow along, but I didn't truly understand the **end-to-end workflow of development and deployment**.

A few weeks ago, a friend asked me to study Node.js with him, and I decided to join him. This project became the perfect learning opportunity.

## 🐳 Docker Containerization Journey

I began by developing a basic budget tracker and running it locally. Immediately, I faced issues with the MongoDB connection, which I solved through **Google searches and ChatGPT guidance**.

Next, I **containerized** the app and tested it again. Here I faced another challenge: the app container was using the MongoDB URL `MONGO_URL=mongodb://mongo:27017`, which pointed to its own localhost where no MongoDB instance existed.

To fix this, I created a **Docker network**, allowing containers to communicate using **DNS names**, since the default bridge network doesn't support DNS resolution.

Finally, I created a **Docker Compose file** with a **health check** for the MongoDB container, ensuring everything worked correctly.

## ☸️ Kubernetes Deployment and Key Learnings

Before deploying to an EKS cluster, I first tested the app on a **Kind cluster**.

### What I Implemented:
- Created a **separate namespace** for resource isolation
- Added a **ConfigMap** for environment variables
- Created **Deployment + Service** for the app
- Created a **StatefulSet + Service** for MongoDB
- Configured an **Ingress resource**

### Key Concepts I Learned:
- **StatefulSets**
- **Persistent Volumes (PVs)**
- **Persistent Volume Claims (PVCs)**
- **Storage Classes**

### 💡 Important Discovery: Database High Availability

One very important concept I discovered:

➡️ For small projects, simply increasing the replica count of a StatefulSet does **not** provide High Availability (HA). The initial replica (replica 1) handles all **read and write** operations. New pods may be created with their own PV/PVC, but without replication, they remain useless.

In real-world systems, this is solved by **Database Replication** (in MongoDB, called a **Replica Set**):

- **Primary node** → Handles writes
- **Secondary nodes** → Handle reads, staying in continuous sync

This ensures both scalability and high availability.

I validated the setup using port forwarding — and everything worked smoothly.

## 🚀 CI/CD Pipeline Implementation

Next, I moved to the CI/CD part. Since I wrote the entire code myself and didn't yet know how to write automated test cases, I skipped the testing stage.

### Jenkins Pipeline Breakdown:

#### 1. **Checkout & Build**
- Checks out the `main` branch from the GitHub repo
- Ensures no unwanted changes were made in `README.md`, `helm/`, or `k8s/` before continuing

#### 2. **Build Image**
- Builds a Docker image with the tag:
  ```
  $USER_NAME/$IMAGE_NAME:$BUILD_NUMBER
  ```

#### 3. **Push Image**
- Pushes the Docker image to Docker Hub using Jenkins credentials

#### 4. **Update Config Files**
- Updates `docker-compose.yml` and `app-deployment.yml` with the new image tag

#### 5. **Git Push**
- Commits and pushes the updated config files back to the `main` branch using Jenkins credentials

After some initial failures, the pipeline ran perfectly ✅.

### 🔒 Security Enhancement with Trivy

Then, I scanned the image with **Trivy** and found vulnerabilities. To fix this, I followed **Abhishek Veeramalla's tutorial** on **multi-stage Docker builds**. Surprisingly, after implementing a multi-stage `Dockerfile`, the new image showed **zero vulnerabilities** 🎉.

## 🔄 Continuous Deployment with ArgoCD

The next step was **Continuous Deployment (CD)**. For this, I needed an EKS cluster.

I had created one earlier, but since AWS had retired the `t3.medium` instance type, my Terraform infra deployment failed. I modified the `tfvars` file to use a `t3.small` instance (2 vCPUs, 2 GB RAM), and this time, the cluster was successfully created.

### Deployment Steps:
- Updated `kubectl` context with the new cluster config
- Installed **ArgoCD** using a YAML manifest
- Configured Git repo as the **single source of truth**

I tested ArgoCD by manually scaling/deleting pods. As expected, ArgoCD auto-reconciled the state and restored the cluster to match Git.

Finally, I deployed an **Ingress Controller**. Since an Ingress resource is useless without a controller, I used the **AWS ALB Ingress Controller**. I retrieved the ALB DNS, and the app was now **publicly accessible** 🌍.

## 🌐 Bonus Experiment: CloudFront Integration

Out of curiosity, I wanted to see how **CloudFront** could integrate with an ALB. I tried it — and it worked perfectly. This gave me hands-on experience with combining **CDN + Load Balancer** for global scalability.

## 🎯 Key Takeaways

This project helped me understand:
- Complete development lifecycle from local development to production deployment
- Docker containerization and networking concepts
- Kubernetes resource management and storage concepts
- CI/CD pipeline implementation with Jenkins
- GitOps principles with ArgoCD
- AWS services integration (EKS, ALB, CloudFront)
- Security scanning and multi-stage Docker builds

## 🛠️ Tech Stack Used

**Backend:** Node.js, Express.js, MongoDB  
**Containerization:** Docker, Docker Compose  
**Orchestration:** Kubernetes (Kind, EKS)  
**CI/CD:** Jenkins, ArgoCD  
**Cloud:** AWS (EKS, ALB, CloudFront)  
**Security:** Trivy for vulnerability scanning  
**Infrastructure:** Terraform  

---

*This project may seem simple, but it provided invaluable hands-on experience with modern DevOps practices and cloud-native development workflows.*