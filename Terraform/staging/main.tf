module "webserver" {
  source      = "../modules/webserver-staging"
  environment = "staging"
  Key_Name    = "AAWEBSITE"
}

