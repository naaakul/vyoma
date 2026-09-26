resource "vultr_firewall_group" "jenkins" {
  description = "jenkins-vm"
}
resource "vultr_firewall_rule" "ssh" {
  firewall_group_id = vultr_firewall_group.jenkins.id
  protocol = "tcp"
  ip_type  = "v4"
  subnet   = "0.0.0.0"
  subnet_size = 0
  port     = "22"
}
resource "vultr_firewall_rule" "jenkins_ui" {
  firewall_group_id = vultr_firewall_group.jenkins.id
  protocol = "tcp"
  ip_type  = "v4"
  subnet   = "0.0.0.0"
  subnet_size = 0
  port     = "8080"
}