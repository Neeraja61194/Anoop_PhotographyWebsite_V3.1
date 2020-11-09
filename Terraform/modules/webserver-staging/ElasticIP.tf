resource "aws_eip" "eip-staging" {
  instance = aws_instance.staging-webserver.id
#   vpc      = true
}


# resource "aws_eip_association" "eip_assoc" {
#   instance_id   = aws_instance.staging-webserver.id
#   allocation_id = "eipalloc-04398bd0610a2f2e0"
# }
