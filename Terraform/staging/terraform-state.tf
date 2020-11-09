terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "staging-aawebsite-terraform-state"
    key            = "staging_AA_Website-terraform-state-storage/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
  }
}