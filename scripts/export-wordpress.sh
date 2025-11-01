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

# Export posts with proper CSV formatting
echo "📝 Exporting posts..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -N -B -e \"
SELECT
  p.ID,
  p.post_title,
  p.post_name,
  p.post_content,
  p.post_excerpt,
  p.post_status,
  p.post_date,
  p.post_modified,
  COALESCE(t.name, ''),
  COALESCE(GROUP_CONCAT(DISTINCT tt.name SEPARATOR '|'), ''),
  COALESCE((SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_title' LIMIT 1), ''),
  COALESCE((SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_metadesc' LIMIT 1), '')
FROM wp_posts p
LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
LEFT JOIN wp_term_taxonomy tx ON tr.term_taxonomy_id = tx.term_taxonomy_id AND tx.taxonomy = 'category'
LEFT JOIN wp_terms t ON tx.term_id = t.term_id
LEFT JOIN wp_term_relationships tr2 ON p.ID = tr2.object_id
LEFT JOIN wp_term_taxonomy tx2 ON tr2.term_taxonomy_id = tx2.term_taxonomy_id AND tx2.taxonomy = 'post_tag'
LEFT JOIN wp_terms tt ON tx2.term_id = tt.term_id
WHERE p.post_type = 'post' AND p.post_status = 'publish'
GROUP BY p.ID
ORDER BY p.post_date DESC;
\"" | sed 's/\t/|||/g' > "$OUTPUT_DIR/posts.csv"

# Export pages
echo "📄 Exporting pages..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -N -B -e \"
SELECT
  p.ID,
  p.post_title,
  p.post_name,
  p.post_content,
  p.post_excerpt,
  p.menu_order,
  p.post_status,
  p.post_date,
  p.post_modified,
  COALESCE((SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_title' LIMIT 1), ''),
  COALESCE((SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_yoast_wpseo_metadesc' LIMIT 1), '')
FROM wp_posts p
WHERE p.post_type = 'page' AND p.post_status = 'publish'
ORDER BY p.menu_order, p.post_title;
\"" | sed 's/\t/|||/g' > "$OUTPUT_DIR/pages.csv"

# Export categories
echo "🏷️  Exporting categories..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -N -B -e \"
SELECT
  t.term_id,
  t.name,
  t.slug,
  COALESCE(tt.description, '')
FROM wp_terms t
JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
WHERE tt.taxonomy = 'category'
ORDER BY t.name;
\"" | sed 's/\t/|||/g' > "$OUTPUT_DIR/categories.csv"

# Export media
echo "🖼️  Exporting media references..."
ssh jtgsystems "mysql -u $DB_USER -p$DB_PASS $DB_NAME -N -B -e \"
SELECT
  p.ID,
  p.guid,
  p.post_title,
  COALESCE(p.post_excerpt, ''),
  p.post_mime_type,
  COALESCE((SELECT meta_value FROM wp_postmeta WHERE post_id = p.ID AND meta_key = '_wp_attachment_metadata' LIMIT 1), '')
FROM wp_posts p
WHERE p.post_type = 'attachment'
ORDER BY p.post_date DESC;
\"" | sed 's/\t/|||/g' > "$OUTPUT_DIR/media.csv"

echo "✅ Export complete! Files saved to: $OUTPUT_DIR"
echo ""
echo "📊 Export Summary:"
echo "  - Posts: $(wc -l < $OUTPUT_DIR/posts.csv) records"
echo "  - Pages: $(wc -l < $OUTPUT_DIR/pages.csv) records"
echo "  - Categories: $(wc -l < $OUTPUT_DIR/categories.csv) records"
echo "  - Media: $(wc -l < $OUTPUT_DIR/media.csv) records"
echo ""
echo "Note: Fields are separated by '|||' delimiter"
