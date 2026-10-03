variable "vultr_api_key" { sensitive = true }
variable "region"         { default = "ewr" }   
variable "cluster_label"  { default = "vyoma-vke" }
variable "ssh_key_id" {
  default = "1ad41c9e-e178-41d0-b18a-380afb28869f"
}