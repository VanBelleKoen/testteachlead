# AWS S3 Static Hosting Setup

This document provides instructions for setting up AWS S3 static hosting with GitHub Actions deployment for your Astro website.

## Prerequisites

- AWS Account with appropriate permissions
- GitHub repository with Actions enabled
- Domain name (optional, for custom domain)

## AWS Setup

### 1. Create S3 Bucket

```bash
# Replace 'your-website-bucket-name' with your desired bucket name
aws s3 mb s3://your-website-bucket-name --region us-east-1
```

### 2. Configure S3 Bucket for Static Website Hosting

```bash
# Enable static website hosting
aws s3 website s3://your-website-bucket-name --index-document index.html --error-document 404.html
```

### 3. Set Bucket Policy (Public Read Access)

Create a bucket policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-website-bucket-name/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy --bucket your-website-bucket-name --policy file://bucket-policy.json
```

### 4. Create IAM User for GitHub Actions

Create an IAM user with programmatic access and attach the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-website-bucket-name",
        "arn:aws:s3:::your-website-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

### 5. Optional: Set up CloudFront Distribution

For better performance and custom domain support:

```bash
# Create CloudFront distribution (replace with your bucket endpoint)
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## GitHub Repository Setup

### 1. Repository Secrets

Add the following secrets in your GitHub repository settings (Settings > Secrets and variables > Actions):

**Secrets:**
- `AWS_ACCESS_KEY_ID`: Your IAM user's access key ID
- `AWS_SECRET_ACCESS_KEY`: Your IAM user's secret access key

### 2. Repository Variables

Add the following variables in your GitHub repository settings (Settings > Secrets and variables > Actions):

**Variables:**
- `AWS_REGION`: Your AWS region (e.g., `us-east-1`)
- `S3_BUCKET_NAME`: Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (optional)

## Deployment

Once configured, the GitHub Action will automatically:

1. **Build** your Astro site when you push to the main branch
2. **Deploy** the built files to your S3 bucket
3. **Invalidate** CloudFront cache (if configured)
4. **Set appropriate cache headers** for optimal performance

## Custom Domain Setup

If you want to use a custom domain:

1. **Route 53**: Create a hosted zone for your domain
2. **CloudFront**: Configure your distribution with your custom domain
3. **SSL Certificate**: Request an ACM certificate in us-east-1
4. **DNS**: Point your domain to the CloudFront distribution

## Monitoring

Monitor your deployments in:
- **GitHub Actions**: Check build and deployment logs
- **CloudWatch**: Monitor S3 and CloudFront metrics
- **AWS Cost Explorer**: Track hosting costs

## Troubleshooting

### Common Issues:

1. **403 Forbidden**: Check bucket policy and IAM permissions
2. **Build Failures**: Verify Node.js version and dependencies
3. **Cache Issues**: Ensure CloudFront invalidation is working
4. **DNS Issues**: Check Route 53 and CloudFront configuration

### Useful Commands:

```bash
# Test website locally
npm run dev

# Build and preview
npm run build
npm run preview

# Check S3 bucket contents
aws s3 ls s3://your-website-bucket-name --recursive

# Manual deploy (for testing)
aws s3 sync dist/ s3://your-website-bucket-name --delete
```

## Security Best Practices

1. Use least-privilege IAM policies
2. Enable S3 bucket versioning
3. Set up AWS CloudTrail for auditing
4. Use strong, unique access keys
5. Rotate access keys regularly
6. Enable MFA for AWS console access
