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
variable "ip1" {
  default = "CLIENTIP1"
}

variable "ip2" {
  default = "CLIENTIP2"
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


