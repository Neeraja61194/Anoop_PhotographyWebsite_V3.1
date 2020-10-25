module "webserver" {
  source      = "../modules/webserver"
  environment = "staging"
  Key_Name    = "AAWEBSITE"
}
