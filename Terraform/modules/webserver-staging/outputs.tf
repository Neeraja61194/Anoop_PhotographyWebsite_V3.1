

output "web_server_security_group_id" {
  value = "${aws_security_group.staging-server-sg.id}"
}

