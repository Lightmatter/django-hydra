variable "environment"{
  type = string
  default = "development"
}
variable "app_name" {
  type = string
  default = "{{cookiecutter.repo_name}}"
}

resource "aws_iam_user" "user" {
  name = var.environment
}

resource "aws_iam_access_key" "key" {
  user = aws_iam_user.user.name
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.app_name}-${var.environment}-test"
  acl    = "public-read"
  region = "us-east-1"

}

resource "aws_iam_user_policy" "user_ro" {
  name = "${var.environment}-bucket"
  user = aws_iam_user.user.name
  policy= <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::${aws_s3_bucket.bucket.bucket}",
                "arn:aws:s3:::${aws_s3_bucket.bucket.bucket}/*"
            ]
        }
   ]
}
EOF
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.bucket.id

  }

  enabled             = true
  is_ipv6_enabled     = true

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.bucket.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
output "aws_storage_bucket_name" {
  value = aws_s3_bucket.bucket.id
}
output "iam_access_key" {
  value = aws_iam_access_key.key.id
}
output "iam_secret_key" {
  value = aws_iam_access_key.key.secret
}
output "cloudfront_url" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}
