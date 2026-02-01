output "rds_endpoint" {
  description = "RDS database endpoint"
  value       = aws_db_instance.mysql.endpoint
  sensitive   = true
}

output "rds_address" {
  description = "RDS database address (hostname)"
  value       = aws_db_instance.mysql.address
}

output "rds_port" {
  description = "RDS database port"
  value       = aws_db_instance.mysql.port
}

output "rds_database_name" {
  description = "RDS database name"
  value       = aws_db_instance.mysql.db_name
}

output "rds_arn" {
  description = "RDS database ARN"
  value       = aws_db_instance.mysql.arn
}
