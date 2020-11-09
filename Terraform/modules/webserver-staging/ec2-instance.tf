
resource "aws_instance" "staging-webserver" {

  ami        = "${var.ami}"
  instance_type   = "${var.instance_type}"
  security_groups = ["${aws_security_group.staging-server-sg.name}"]
  key_name        = "${var.Key_Name}"


  user_data = "${file("${path.module}/user-data.sh")}"


  tags = {
    Name = "staging-webserver"
  }


}