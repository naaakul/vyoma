resource "vultr_instance" "jenkins" {
  region      = var.region
  plan        = "vc2-2c-4gb"
  os_id       = 2284  # Ubuntu 24.04 x64 - check `vultr-cli os list` for current id
  label       = "jenkins"
  firewall_group_id = vultr_firewall_group.jenkins.id
  ssh_key_ids = [var.ssh_key_id]
}

output "jenkins_ip" {
  value = vultr_instance.jenkins.main_ip
}