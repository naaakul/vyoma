resource "vultr_container_registry" "vyoma" {
  name   = "vyoma-registry"
  public = false
  region = var.region
  plan   = "start_up"
}