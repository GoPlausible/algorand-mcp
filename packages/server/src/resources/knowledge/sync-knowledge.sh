#!/bin/bash

# Configuration
BUCKET_NAME="plausibleai"
OUTPUT_DIR="taxonomy"
LIST="list.json"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "Starting knowledge sync from R2 bucket for list docs..."

# Create temporary JSON file from list
echo "[" > "$LIST"
first=true
while IFS= read -r line || [ -n "$line" ]; do
    if [ -n "$line" ]; then
        if [ "$first" = true ]; then
            first=false
        else
            echo -n "," >> "$LIST"
        fi
        echo -n "{\"key\": \"$line\"}" >> "$LIST"
    fi
done < developers.txt
echo "]" >> "$LIST"

# Validate JSON structure
if ! jq empty "$LIST" 2>/dev/null; then
    echo "Error: Invalid JSON in $LIST"
    exit 1
fi

# Read and process taxonomy list
echo "Processing List docs from $LIST..."
jq -c '.[]' "$LIST" 2>/dev/null | while read -r object; do
    if [ -z "$object" ]; then
        echo "Error: Empty object found in JSON"
        continue
    fi

    # Extract key and verify it exists
    key=$(echo "$object" | jq -r '.key // empty')
    if [ -z "$key" ]; then
        echo "Error: Missing key in object"
        continue
    fi
    
    # Create directory structure based on key path
    dir_path="$OUTPUT_DIR/$(dirname "$key")"
    mkdir -p "$dir_path"
    
    # Get output path
    output_path="$OUTPUT_DIR/$key"
    
    echo "Downloading $key..."
    sudo wrangler r2 object get "$BUCKET_NAME/$key" > "$output_path"
    
    if [ $? -eq 0 ]; then
        echo "Successfully downloaded $key"
    else
        echo "Failed to download $key"
        rm -f "$output_path"  # Clean up failed download
    fi
done

# Create index file for List docs
echo "Creating List docs index file..."
{
    echo "# List Documentation Index"
    echo
    echo "## Categories"
    echo
    
    # List all markdown files and create index entries
    find "$OUTPUT_DIR" -name "*.md" | while read -r file; do
        name=$(basename "$file" .md)
        category=$(dirname "$file" | sed "s|$OUTPUT_DIR/||")
        if [ "$category" = "$OUTPUT_DIR" ]; then
            category="General"
        fi
        
        # Extract first heading from file as description
        description=$(head -n 1 "$file" | sed 's/^#* //')
        
        echo "### $category"
        echo "- [$name]($file): $description"
        echo
    done
} > "$OUTPUT_DIR/clis_index.md"

# Cleanup
rm "$LIST"

echo "LQ docs sync complete!"
echo "Files are available in the $OUTPUT_DIR directory"
echo "Index created at $OUTPUT_DIR/liquid_auth_index.md"
