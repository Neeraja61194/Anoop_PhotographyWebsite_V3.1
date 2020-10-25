output "lb-dns" {
  value = "${module.webserver.lb-dns}"
}
output "LoadBalancer_security_group" {
  value = "${module.webserver.load_balancer_security_group_id}"
}

output "webserver_security_group" {
  value = "${module.webserver.web_server_security_group_id}"
}

