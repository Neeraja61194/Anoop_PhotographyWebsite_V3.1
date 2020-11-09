output "lb-dns" {
  value = "${aws_elb.loadbalancer-webserver.dns_name}"
}
output "load_balancer_security_group_id" {
  value = "${aws_security_group.lb-sg.id}"
}

output "web_server_security_group_id" {
  value = "${aws_security_group.webserver-sg.id}"
}


 
 