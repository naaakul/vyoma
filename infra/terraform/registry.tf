resource "vultr_container_registry" "vyoma" {
  name   = "vyomaregistry"
  public = false
  region = var.region
  plan   = "start_up"
}