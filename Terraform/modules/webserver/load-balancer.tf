resource "aws_elb" "loadbalancer-webserver" {
  name               = "loadbalancer-ws-${var.environment}"
  security_groups    = ["${aws_security_group.lb-sg.id}"]
  availability_zones = "${var.azs}"
  listener {
    instance_port     = "${var.http-port}"
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  listener {
    instance_port      = "${var.http-port}"
    instance_protocol  = "http"
    lb_port            = 443
    lb_protocol        = "https"
    ssl_certificate_id = "${var.SSLCertificateID}"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 20
    target              = "HTTP:${var.http-port}/"
    interval            = 30
  }

}
