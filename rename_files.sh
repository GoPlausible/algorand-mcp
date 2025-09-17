#!/bin/bash

# Script to rename files in the taxonomy directory
# Changes:
# - ARCs: to arcs:
# - SDKs: to sdks:
# - TEALScript: to tealscript:

# Directory to process
DIRECTORY="/Users/mg/Documents/GitHub/GoPlausible/algorand-mcp/packages/server/src/resources/knowledge/taxonomy"

# Check if directory exists
if [ ! -d "$DIRECTORY" ]; then
    echo "Error: Directory $DIRECTORY does not exist."
    exit 1
fi

# Counter for renamed files
renamed_count=0

# Function to process a file
process_file() {
    local file="$1"
    local basename=$(basename "$file")
    local dirname=$(dirname "$file")
    local new_name=""
    
    # Check if file name starts with ARCs:
    if [[ "$basename" == ARCs:* ]]; then
        new_name="${dirname}/arcs:${basename#ARCs:}"
        echo "Renaming: $file -> $new_name"
        mv "$file" "$new_name"
        ((renamed_count++))
    # Check if file name starts with SDKs:
    elif [[ "$basename" == SDKs:* ]]; then
        new_name="${dirname}/sdks:${basename#SDKs:}"
        echo "Renaming: $file -> $new_name"
        mv "$file" "$new_name"
        ((renamed_count++))
    # Check if file name starts with TEALScript:
    elif [[ "$basename" == TEALScript_* ]]; then
        new_name="${dirname}/tealscript:${basename#TEALScript_}"
        echo "Renaming: $file -> $new_name"
        mv "$file" "$new_name"
        ((renamed_count++))
    fi
}

# Find all files in the directory and process them
echo "Starting to process files in $DIRECTORY..."
find "$DIRECTORY" -type f | while read -r file; do
    process_file "$file"
done

# Find all directories in the directory and process them
# This is needed because directory names might also need to be renamed
find "$DIRECTORY" -type d | sort -r | while read -r dir; do
    # Skip the root directory
    if [ "$dir" != "$DIRECTORY" ]; then
        basename=$(basename "$dir")
        dirname=$(dirname "$dir")
        
        # Check if directory name starts with ARCs:
        if [[ "$basename" == ARCs:* ]]; then
            new_name="${dirname}/arcs:${basename#ARCs:}"
            echo "Renaming directory: $dir -> $new_name"
            mv "$dir" "$new_name"
            ((renamed_count++))
        # Check if directory name starts with SDKs:
        elif [[ "$basename" == SDKs:* ]]; then
            new_name="${dirname}/sdks:${basename#SDKs:}"
            echo "Renaming directory: $dir -> $new_name"
            mv "$dir" "$new_name"
            ((renamed_count++))
        # Check if directory name starts with TEALScript:
        elif [[ "$basename" == TEALScript:* ]]; then
            new_name="${dirname}/tealscript:${basename#TEALScript:}"
            echo "Renaming directory: $dir -> $new_name"
            mv "$dir" "$new_name"
            ((renamed_count++))
        fi
    fi
done

echo "Renaming complete. Total items renamed: $renamed_count"
