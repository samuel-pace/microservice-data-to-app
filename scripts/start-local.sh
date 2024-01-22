
echo "Starting SQS queues..."
sudo docker compose up -d

# echo "Starting database connections..."
# npm link store-layer

echo "Starting local server..."
npx sls offline start --reloadHandler --noTimeout