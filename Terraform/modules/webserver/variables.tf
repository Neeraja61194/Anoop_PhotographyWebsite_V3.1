variable "region" {
  default = "us-east-1a"
}

variable "instance_type" {
  default = "t2.micro"

}

variable "ami" {

  default = "ami-0c94855ba95c71c99"
}

variable "http-port" {
  default = "80"
}

variable "https-port" {
  default = "443"
}

variable "ssh-port" {
  default = "22"
}
variable "my-ip" {
  default = "USERIPTOBEFILLEDHERE"
}

variable "azs" {
  default = ["us-east-1a"]
}

variable "Key_Name" {
  default = "NONE"
}

variable "environment" {

  default = "undefined"

}

variable "SSLCertificateID" {
  default = "certARNTOBEFILLEDHERE"
  //example: default = "arn:aws:acm:us-east-1:476905969651:certificate/c98ad3d1-720a-40ac-8c67-44aa3ccf2d56jp"

}