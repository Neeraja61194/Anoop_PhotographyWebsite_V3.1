resource "aws_security_group" "webserver-sg" {

  name = "webserver-sg"

}

resource "aws_security_group_rule" "allow_load_balancer_ingress" {
  type                     = "ingress"
  security_group_id        = "${aws_security_group.webserver-sg.id}"
  from_port                = "${var.http-port}"
  to_port                  = "${var.http-port}"
  protocol                 = "tcp"
  source_security_group_id = "${aws_security_group.lb-sg.id}"


}


resource "aws_security_group_rule" "allow_ssh_ingress" {
  type              = "ingress"
  security_group_id = "${aws_security_group.webserver-sg.id}"
  from_port         = "${var.ssh-port}"
  to_port           = "${var.ssh-port}"
  protocol          = "tcp"
  cidr_blocks       = ["${var.my-ip}"]


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
  cidr_blocks       = ["${var.my-ip}"]
}