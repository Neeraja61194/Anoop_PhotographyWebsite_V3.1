resource "aws_route53_record" "Prod-Domain-ELB-Association" {
  zone_id = "Z076684211QDYON7DTKA6"
  name    = "anooparunan.com"
  type    = "A"


 alias {
    name                   = aws_elb.loadbalancer-webserver.dns_name
    zone_id                = aws_elb.loadbalancer-webserver.zone_id
    evaluate_target_health = true
  }


  # records = ["dualstack.${aws_elb.loadbalancer-webserver.dns_name}"]
}