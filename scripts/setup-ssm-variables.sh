aws ssm put-parameter --name '/st-marche/staging/api/data-to-app/mssql/user' --value 'lambda' --overwrite --type String
aws ssm put-parameter --name '/st-marche/staging/api/data-to-app/password' --value 'lambda' --overwrite --type String
aws ssm put-parameter --name '/st-marche/staging/api/data-to-app/database' --value 'lambda' --overwrite --type String
aws ssm put-parameter --name '/st-marche/staging/api/data-to-app/api-domain' --value 'staging.api.marche.com.br' --overwrite --type String
aws ssm put-parameter --name '/st-marche/staging/api/data-to-app/data-location' --value 'Dm.dbo.RecomendacaoConcentreSuaCompraFiltro' --overwrite --type String
aws ssm put-parameter --name '/st-marche/staging/api/data-to-app/redis-url' --value 'redis://default:z43rkMCDPpwpNdixoTWrmApctI4wSx5d@redis-19396.c275.us-east-1-4.ec2.cloud.redislabs.com:19396' --overwrite --type String
