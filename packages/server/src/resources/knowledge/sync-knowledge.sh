#!/bin/bash

# Configuration
BUCKET_NAME="plausibleai"
OUTPUT_DIR="taxonomy"
PUYA_LIST="puya_list.json"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "Starting knowledge sync from R2 bucket for Puya docs..."

# Create temporary JSON file from developers-puya.txt
echo "[" > "$PUYA_LIST"
first=true
while IFS= read -r line || [ -n "$line" ]; do
    if [ -n "$line" ]; then
        if [ "$first" = true ]; then
            first=false
        else
            echo -n "," >> "$PUYA_LIST"
        fi
        echo -n "{\"key\": \"$line\"}" >> "$PUYA_LIST"
    fi
done < developers-puya.txt
echo "]" >> "$PUYA_LIST"

# Validate JSON structure
if ! jq empty "$PUYA_LIST" 2>/dev/null; then
    echo "Error: Invalid JSON in $PUYA_LIST"
    exit 1
fi

# Read and process taxonomy list
echo "Processing Puya docs from $PUYA_LIST..."
jq -c '.[]' "$PUYA_LIST" 2>/dev/null | while read -r object; do
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

# Create index file for Puya docs
echo "Creating Puya docs index file..."
{
    echo "# Puya Documentation Index"
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
} > "$OUTPUT_DIR/puya_index.md"

# Cleanup
rm "$PUYA_LIST"

echo "Puya docs sync complete!"
echo "Files are available in the $OUTPUT_DIR directory"
echo "Index created at $OUTPUT_DIR/puya_index.md"
