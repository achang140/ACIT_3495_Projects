# Kubectl Commands

```
kubectl apply -f configmap-secret.yml

kubectl apply -f pv-pvc.yml
kubectl apply -f services.yml
kubectl apply -f deployments.yml
kubectl apply -f auto-scaling.yml 
```

```
gcloud compute disk create mysql-disk --zone=us-central1-a --size=5GB

gcloud compute disk create filesystem-disk --zone=us-central1-a --size=5GB
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

kubectl get pods 
kubectl get services 
kubectl get deployments 
kubectl get pv
kubectl get pvc
kubectl get jobs
```

