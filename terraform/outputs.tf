output "vpc_id" {
  description = "VPC ID"
  value       = module.networking.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = module.networking.public_subnet_ids
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = module.networking.private_subnet_ids
}

output "app_security_group_id" {
  description = "Application security group ID"
  value       = module.networking.app_security_group_id
}

output "instance_ids" {
  description = "EC2 instance IDs"
  value       = module.compute.instance_ids
}

output "instance_public_ips" {
  description = "Public IP addresses of EC2 instances"
  value       = module.compute.instance_public_ips
}

output "rds_endpoint" {
  description = "RDS database endpoint"
  value       = module.database.rds_endpoint
  sensitive   = true
}

output "rds_port" {
  description = "RDS database port"
  value       = module.database.rds_port
}
