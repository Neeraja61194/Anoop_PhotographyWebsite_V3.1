#!/bin/bash -xe
#installing docker
sudo su
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

#installing docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

#building docker containers
docker login --username USERNAME --password PASSWORD
mkdir /opt/app
cd /opt/app && { curl -O https://raw.githubusercontent.com/Neeraja61194/Anoop_PhotographyWebsite_V3.1/master/docker-compose_terraform.yml ; }
docker-compose -f /opt/app/docker-compose_terraform.yml up -d