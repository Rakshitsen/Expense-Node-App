# AWS Load Balancer Controller Installation on EKS

Follow these steps to set up the AWS Load Balancer Controller on your EKS cluster.

---

## 1. Associate IAM OIDC Provider
```bash
eksctl utils associate-iam-oidc-provider \
  --region <your-region> \
  --cluster <your-cluster-name> \
  --approve
```

**Description:** Connects your EKS cluster with AWS IAM for service accounts, enabling secure permissions.

## 2. Download IAM Policy

```bash
curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json
```

**Description:** Fetches the official IAM policy required for the AWS Load Balancer Controller.

## 3. Create IAM Policy

```bash
aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file://iam_policy.json
```

**Description:** Creates an IAM policy in AWS with the permissions needed for the controller.

## 4. Create IAM Service Account

```bash
eksctl create iamserviceaccount \
  --cluster <your-cluster-name> \
  --namespace kube-system \
  --name aws-load-balancer-controller \
  --attach-policy-arn arn:aws:iam::<your-account-id>:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve
```

**Description:** Links the IAM policy to a Kubernetes service account for the controller to use.

## 5. Add and Update Helm Repository

```bash
helm repo add eks https://aws.github.io/eks-charts
helm repo update
```

**Description:** Adds the official AWS EKS Helm charts repository and updates it.

## 6. Install/Upgrade AWS Load Balancer Controller

```bash
helm upgrade -i aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=<your-cluster-name> \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=<your-region> \
  --set vpcId=<your-vpc-id>
```

**Description:** Deploys or upgrades the AWS Load Balancer Controller in your EKS cluster using Helm.

## Notes:
* Replace `<your-region>`, `<your-cluster-name>`, `<your-account-id>`, and `<your-vpc-id>` with your specific values.
* Make sure the service account and IAM policy are correctly linked.


After deployment, copy your ALB DNS name and open it in the browser. It might not work with https, so use http and it should start working.
Example:

http://<your-alb-dns-name>