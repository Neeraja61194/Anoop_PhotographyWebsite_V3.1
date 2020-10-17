resource "aws_autoscaling_group" "webserver-autoscaling-group" {

  launch_configuration = "${aws_launch_configuration.webserver-lc.id}"
  max_size             = "1"
  min_size             = "1"
  desired_capacity     = "1"
  load_balancers       = ["${aws_elb.loadbalancer-webserver.id}"]
  availability_zones   = "${var.azs}"
  tag {

    key                 = "Name"
    value               = "WebServer-${var.environment}"
    propagate_at_launch = true
  }
}
