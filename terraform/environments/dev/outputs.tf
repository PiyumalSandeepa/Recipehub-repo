output "vpc_id" {
  description = "Development VPC ID"
  value       = module.networking.vpc_id
}

output "instance_ids" {
  description = "Development EC2 instance IDs"
  value       = module.compute.instance_ids
}

output "instance_public_ips" {
  description = "Development EC2 public IPs"
  value       = module.compute.instance_public_ips
}

output "rds_address" {
  description = "Development RDS endpoint"
  value       = module.database.rds_address
}
