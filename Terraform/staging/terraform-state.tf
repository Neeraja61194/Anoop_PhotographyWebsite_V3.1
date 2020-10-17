terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "jperump-terraform-state"
    key            = "AA_Web_terraform-state-storage/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
  }
}