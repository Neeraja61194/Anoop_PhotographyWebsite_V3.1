resource "aws_security_group" "webserver-sg" {

  name = "webserver-sg-${var.environment}"

}

resource "aws_security_group_rule" "allow_load_balancer_ingress" {
  type                     = "ingress"
  security_group_id        = "${aws_security_group.webserver-sg.id}"
  from_port                = "${var.http-port}"
  to_port                  = "${var.http-port}"
  protocol                 = "tcp"
  source_security_group_id = "${aws_security_group.lb-sg.id}"


}

resource "aws_security_group_rule" "allow_https_ingress" {
  type              = "ingress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = "${var.https-port}"
  to_port           = "${var.https-port}"
  protocol          = "tcp"
  cidr_blocks       = ["${var.ip1}"]

}



resource "aws_security_group_rule" "allow_ssh_ingress" {
  type              = "ingress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = "${var.ssh-port}"
  to_port           = "${var.ssh-port}"
  protocol          = "tcp"
  cidr_blocks       = ["${var.ip1}"]


}

resource "aws_security_group_rule" "allow_egress_traffic" {
  type              = "egress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]


}


resource "aws_security_group_rule" "allow_http_ingress_to_webserver" {
  type              = "ingress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = "${var.http-port}"
  to_port           = "${var.http-port}"
  protocol          = "tcp"
  cidr_blocks       = ["${var.ip1}"]
}


resource "aws_security_group_rule" "allow_netdata_connection_ip1" {
  type              = "ingress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = "19999"
  to_port           = "19999"
  protocol          = "tcp"
  cidr_blocks       = ["${var.ip1}"]
  # cidr_blocks       = ["0.0.0.0/0"]

}


resource "aws_security_group_rule" "allow_netdata_connection_ip2" {
  type              = "ingress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = "19999"
  to_port           = "19999"
  protocol          = "tcp"
  cidr_blocks       = ["${var.ip2}"]
  # cidr_blocks       = ["0.0.0.0/0"]

}

resource "aws_security_group_rule" "allow_netdata_connection_LB" {
  type                     = "ingress"
  security_group_id        = "${aws_security_group.webserver-sg.id}"
  from_port                = "19999"
  to_port                  = "19999"
  protocol                 = "tcp"
  source_security_group_id = "${aws_security_group.lb-sg.id}"

}