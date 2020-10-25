terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "aawebsite-terraform-state"
    key            = "AA_Website-terraform-state-storage/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
  }
}