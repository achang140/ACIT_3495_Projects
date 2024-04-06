# Kubectl Commands

```
kubectl apply -f configmap-secret.yml

kubectl apply -f pv-pvc.yml
kubectl apply -f services.yml
kubectl apply -f deployments.yml
kubectl apply -f auto-scaling.yml 
```

```
gcloud compute disks create mysql-disk --zone=us-central1-c --size=5GB

gcloud compute disks create filesystem-disk --zone=us-central1-c --size=5GB
```

```
kubectl delete deployments --all
kubectl delete services --all
kubectl delete jobs --all 
kubectl delete pv --all
kubectl delete pvc --all 
kubectl delete pods --all
```

```
kubectl get hpa
watch kubectl get hpa

kubectl get configmaps
kubectl get secrets
kubectl get pods 
kubectl get services 
kubectl get deployments 
kubectl get pv
kubectl get pvc
kubectl get jobs
```

