resource "aws_launch_configuration" "webserver-lc" {

  name_prefix     = "webserver-launch-${var.environment}"
  image_id        = "${var.ami}"
  instance_type   = "${var.instance_type}"
  security_groups = ["${aws_security_group.webserver-sg.id}"]
  key_name        = "${var.Key_Name}"


  user_data = "${file("${path.module}/user-data.sh")}"

  lifecycle {
    create_before_destroy = true
  }


}