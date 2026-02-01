output "vpc_id" {
  description = "Production VPC ID"
  value       = module.networking.vpc_id
}

output "instance_ids" {
  description = "Production EC2 instance IDs"
  value       = module.compute.instance_ids
}

output "instance_public_ips" {
  description = "Production EC2 public IPs"
  value       = module.compute.instance_public_ips
}

output "rds_address" {
  description = "Production RDS endpoint"
  value       = module.database.rds_address
  sensitive   = true
}

output "rds_port" {
  description = "Production RDS port"
  value       = module.database.rds_port
}
