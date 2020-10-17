resource "aws_security_group" "lb-sg" {
  name = "load-balancer-sg"
}

resource "aws_security_group_rule" "allow_http_ingress_to_lb" {
  type              = "ingress"
  security_group_id = "${aws_security_group.lb-sg.id}"
  from_port         = "${var.http-port}"
  to_port           = "${var.http-port}"
  protocol          = "tcp"
  # cidr_blocks       = ["${var.my-ip}"]
  cidr_blocks       = ["0.0.0.0/0"]
}


resource "aws_security_group_rule" "allow_https_ingress_to_lb" {
  type              = "ingress"
  security_group_id = "${aws_security_group.lb-sg.id}"
  from_port         = "${var.https-port}"
  to_port           = "${var.https-port}"
  protocol          = "tcp"
  # cidr_blocks       = ["${var.my-ip}"]
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_egress_traffic_from_lb" {
  type                     = "egress"
  security_group_id        = "${aws_security_group.lb-sg.id}"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  source_security_group_id = "${aws_security_group.webserver-sg.id}"

}

