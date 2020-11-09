resource "aws_autoscaling_policy" "autoscaling_policy" {
  name                   = "webserver-autoscaling-policy-${var.environment}"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = "${aws_autoscaling_group.webserver-autoscaling-group.name}"


  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 70.0
  }

}
