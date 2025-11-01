#!/bin/bash

# WordPress Content Export Script
# Exports all content from WordPress database for migration

echo "🔄 Exporting WordPress Content..."

# Database credentials
DB_HOST="localhost"
DB_USER="st_catharines_computers"
DB_PASS="SeEpJ6sbea2ryEt4"
DB_NAME="st_catharines_computers"
OUTPUT_DIR="./wordpress-export"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "📁 Created output directory: $OUTPUT_DIR"

# Export posts
echo "📝 Exporting posts..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -e \"
SELECT
  p.ID,
  p.post_title as title,
  p.post_name as slug,
  p.post_content as content,
  p.post_excerpt as excerpt,
  p.post_status as status,
  p.post_date as created_at,
  p.post_modified as updated_at,
  t.name as category,
  GROUP_CONCAT(DISTINCT tt.name SEPARATOR ',') as tags,
  (SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_title' LIMIT 1) as meta_title,
  (SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_metadesc' LIMIT 1) as meta_desc
FROM wp_posts p
LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
LEFT JOIN wp_term_taxonomy tx ON tr.term_taxonomy_id = tx.term_taxonomy_id AND tx.taxonomy = 'category'
LEFT JOIN wp_terms t ON tx.term_id = t.term_id
LEFT JOIN wp_term_relationships tr2 ON p.ID = tr2.object_id
LEFT JOIN wp_term_taxonomy tx2 ON tr2.term_taxonomy_id = tx2.term_taxonomy_id AND tx2.taxonomy = 'post_tag'
LEFT JOIN wp_terms tt ON tx2.term_id = tt.term_id
WHERE p.post_type = 'post' AND p.post_status = 'publish'
GROUP BY p.ID
INTO OUTFILE '/tmp/posts_export.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '\\\"' LINES TERMINATED BY '\\n';
\" 2>&1" > "$OUTPUT_DIR/posts.csv"

# Export pages
echo "📄 Exporting pages..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -e \"
SELECT
  p.ID,
  p.post_title as title,
  p.post_name as slug,
  p.post_content as content,
  p.post_excerpt as excerpt,
  p.menu_order as display_order,
  p.post_status as status,
  p.post_date as created_at,
  p.post_modified as updated_at,
  (SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_title' LIMIT 1) as meta_title,
  (SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_metadesc' LIMIT 1) as meta_desc
FROM wp_posts p
WHERE p.post_type = 'page' AND p.post_status = 'publish'
INTO OUTFILE '/tmp/pages_export.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '\\\"' LINES TERMINATED BY '\\n';
\" 2>&1" > "$OUTPUT_DIR/pages.csv"

# Export categories
echo "🏷️  Exporting categories..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -e \"
SELECT
  t.term_id as id,
  t.name,
  t.slug,
  tt.description
FROM wp_terms t
JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
WHERE tt.taxonomy = 'category'
INTO OUTFILE '/tmp/categories_export.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '\\\"' LINES TERMINATED BY '\\n';
\" 2>&1" > "$OUTPUT_DIR/categories.csv"

# Export media
echo "🖼️  Exporting media references..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -e \"
SELECT
  p.ID,
  p.guid as url,
  p.post_title as title,
  p.post_excerpt as caption,
  p.post_mime_type as mime_type,
  (SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_wp_attachment_metadata' LIMIT 1) as metadata
FROM wp_posts p
WHERE p.post_type = 'attachment'
INTO OUTFILE '/tmp/media_export.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '\\\"' LINES TERMINATED BY '\\n';
\" 2>&1" > "$OUTPUT_DIR/media.csv"

# Download the files from server
echo "⬇️  Downloading export files from server..."
scp jtgsystems:/tmp/*_export.csv "$OUTPUT_DIR/"

# Clean up server temp files
ssh jtgsystems "rm -f /tmp/*_export.csv"

echo "✅ Export complete! Files saved to: $OUTPUT_DIR"
echo ""
echo "📊 Export Summary:"
echo "  - Posts: $(wc -l < $OUTPUT_DIR/posts.csv) records"
echo "  - Pages: $(wc -l < $OUTPUT_DIR/pages.csv) records"
echo "  - Categories: $(wc -l < $OUTPUT_DIR/categories.csv) records"
echo "  - Media: $(wc -l < $OUTPUT_DIR/media.csv) records"
