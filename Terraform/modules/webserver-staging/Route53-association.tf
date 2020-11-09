resource "aws_route53_record" "staging" {
  zone_id = "Z0413048FYZO9M6WUCG3"
  name    = "staging.anooparunan.com"
  type    = "A"
  ttl     = "300"
  records = [aws_eip.eip-staging.public_ip]
}