# Terraform Infrastructure

This directory contains Terraform configurations for the RecipeHub infrastructure.

## Folder Structure

- `main.tf` - Main provider and resource configurations
- `variables.tf` - Input variable definitions
- `outputs.tf` - Output value definitions
- `terraform.tfvars` - Variable values
- `modules/` - Reusable Terraform modules
  - `networking/` - VPC, subnets, security groups
  - `compute/` - EC2, containers, load balancers
  - `database/` - RDS, DynamoDB, other databases
- `environments/` - Environment-specific configurations
  - `dev/` - Development environment
  - `prod/` - Production environment
