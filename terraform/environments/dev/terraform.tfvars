aws_region           = "us-east-1"
environment          = "dev"
vpc_cidr             = "10.0.0.0/16"
availability_zones   = ["us-east-1a", "us-east-1b"]
instance_type        = "t3.micro"
instance_count       = 1
database_name        = "recipehub_dev"
database_username    = "admin"
# NOTE: Set database_password via environment variable or secret management
db_allocated_storage = 20
db_engine_version    = "8.0"
