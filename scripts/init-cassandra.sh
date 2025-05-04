#!/bin/bash

# Wait for Cassandra to be ready
echo "Waiting for Cassandra to be ready..."
max_retries=30
retry_count=0

while [ $retry_count -lt $max_retries ]; do
    if cqlsh -e "describe keyspaces" cassandra 9042; then
        echo "Cassandra is ready!"
        break
    fi
    echo "Cassandra is not ready yet. Retrying in 5 seconds... (Attempt $((retry_count + 1))/$max_retries)"
    sleep 5
    retry_count=$((retry_count + 1))
done

if [ $retry_count -eq $max_retries ]; then
    echo "Failed to connect to Cassandra after $max_retries attempts. Exiting."
    exit 1
fi

echo "Creating keyspace and table..."
if ! cqlsh cassandra 9042 -f /init-cassandra.cql; then
    echo "Failed to initialize Cassandra schema. Exiting."
    exit 1
fi

echo "Initialization complete!" 