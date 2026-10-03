resource "vultr_kubernetes" "vyoma" {
  region  = var.region
  label   = var.cluster_label
  version = "v1.37.1+2"

  node_pools {
    node_quantity = 2
    plan          = "vc2-2c-4gb"
    label         = "sandboxd-pool"
    auto_scaler   = true
    min_nodes     = 2
    max_nodes     = 5
  }
}

output "kubeconfig" {
  value     = vultr_kubernetes.vyoma.kube_config
  sensitive = true
}