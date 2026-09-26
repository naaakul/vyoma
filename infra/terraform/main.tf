terraform {
  required_providers {
    vultr = { source = "vultr/vultr", version = "~> 2.20" }
  }
}
provider "vultr" { api_key = var.vultr_api_key }