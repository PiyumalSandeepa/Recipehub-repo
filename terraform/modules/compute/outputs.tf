output "instance_ids" {
  description = "EC2 instance IDs"
  value       = aws_instance.app[*].id
}

output "instance_public_ips" {
  description = "Public IP addresses"
  value       = aws_instance.app[*].public_ip
}

output "instance_private_ips" {
  description = "Private IP addresses"
  value       = aws_instance.app[*].private_ip
}
