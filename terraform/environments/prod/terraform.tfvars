aws_region           = "us-east-1"
environment          = "prod"
vpc_cidr             = "10.1.0.0/16"
availability_zones   = ["us-east-1a", "us-east-1b"]
instance_type        = "t3.small"
instance_count       = 2
database_name        = "recipehub_prod"
database_username    = "admin"
# NOTE: Set database_password via environment variable or AWS Secrets Manager
db_allocated_storage = 100
db_engine_version    = "8.0"
