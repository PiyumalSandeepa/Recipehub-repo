terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "recipehub-terraform-state"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
}

# Import modules from parent directory
module "networking" {
  source = "../../modules/networking"

  vpc_cidr           = var.vpc_cidr
  environment        = var.environment
  availability_zones = var.availability_zones
}

module "compute" {
  source = "../../modules/compute"

  environment        = var.environment
  instance_type      = var.instance_type
  instance_count     = var.instance_count
  vpc_id             = module.networking.vpc_id
  subnet_ids         = module.networking.public_subnet_ids
  security_group_id  = module.networking.app_security_group_id
}

module "database" {
  source = "../../modules/database"

  environment        = var.environment
  database_name      = var.database_name
  database_username  = var.database_username
  database_password  = var.database_password
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  security_group_id  = module.networking.db_security_group_id
  allocated_storage  = var.db_allocated_storage
  engine_version     = var.db_engine_version
}
