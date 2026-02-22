"""
Process GeoJSON file with restaurant data and export to various formats
"""

import json
import csv
from typing import List, Dict, Optional
from datetime import datetime
import os

class GeoJSONProcessor:
    def __init__(self, geojson_path: str):
        self.geojson_path = geojson_path
        self.restaurants = []
        
    def load_geojson(self) -> Dict:
        """Load GeoJSON file"""
        print(f"Loading {self.geojson_path}...")
        
        try:
            with open(self.geojson_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            features = data.get('features', []) if isinstance(data, dict) else data
            print(f"✓ Loaded {len(features)} features")
            return features
            
        except FileNotFoundError:
            print(f"✗ File not found: {self.geojson_path}")
            return []
        except json.JSONDecodeError as e:
            print(f"✗ Invalid JSON: {e}")
            return []
    
    def clean_restaurant(self, feature: Dict) -> Optional[Dict]:
        """Extract and clean restaurant data from GeoJSON feature"""
        properties = feature.get('properties', {})
        geometry = feature.get('geometry', {})
        
        # Get name from various possible fields
        name = (properties.get('name') or 
                properties.get('NAME') or 
                properties.get('name:en') or
                properties.get('official_name'))
        
        if not name:
            return None
        
        # Get coordinates
        coordinates = geometry.get('coordinates', [])
        if len(coordinates) >= 2:
            lon, lat = coordinates[0], coordinates[1]
        else:
            # Try to get from feature properties
            lat = properties.get('lat') or properties.get('latitude')
            lon = properties.get('lon') or properties.get('longitude')
            
        if not lat or not lon:
            return None
        
        # Extract cuisine
        cuisine = (properties.get('cuisine') or 
                   properties.get('food') or 
                   properties.get('amenity', 'General'))
        
        if isinstance(cuisine, str):
            # Clean cuisine: take first if multiple, capitalize
            cuisine = cuisine.split(';')[0].split(',')[0].strip()
            cuisine = cuisine.replace('_', ' ').title()
            
            # Map common amenity types to cuisine
            amenity_map = {
                'restaurant': 'General',
                'fast_food': 'Fast Food',
                'cafe': 'Cafe',
                'food_court': 'Food Court'
            }
            if cuisine.lower() in amenity_map:
                cuisine = amenity_map[cuisine.lower()]
        else:
            cuisine = 'General'
        
        # Build address
        address_parts = []
        
        # Try various address fields
        street = (properties.get('addr:street') or 
                 properties.get('street') or 
                 properties.get('addr:housename') or
                 properties.get('address'))
        if street:
            house_number = properties.get('addr:housenumber', '')
            if house_number:
                address_parts.append(f"{house_number} {street}")
            else:
                address_parts.append(street)
        
        city = (properties.get('addr:city') or 
                properties.get('city') or 
                properties.get('addr:district') or
                'Chennai')
        address_parts.append(city)
        
        state = properties.get('addr:state', '')
        if state:
            address_parts.append(state)
        
        address = ', '.join(filter(None, address_parts))
        if not address:
            address = "Chennai, India"
        
        # Generate description from various fields
        description = properties.get('description', '')
        if not description:
            opening_hours = properties.get('opening_hours', '')
            if opening_hours:
                description = f"Open: {opening_hours}"
        
        # Extract additional useful fields
        phone = properties.get('phone') or properties.get('contact:phone', '')
        website = properties.get('website') or properties.get('contact:website', '')
        
        # Generate mock rating and delivery time based on name hash
        name_hash = hash(name)
        rating = round(4.0 + (abs(name_hash) % 10) / 10, 1)  # 4.0-4.9
        delivery_time = 20 + (abs(name_hash) % 30)  # 20-50 minutes
        delivery_fee = round(1.5 + (abs(name_hash) % 30) / 10, 2)  # 1.5-4.5

        # List of valid food images from Unsplash
        food_images = [
            "1546069901-ba9599a7e63c", "1568901346375-23c9450c58cd", "1567620905732-2d1ec7ab7445",
            "1565299624946-b28f40a0ae38", "1540189549336-e6e99c3679fe", "1565958011703-44f9829ba187",
            "1484723091739-30a097e8f929", "1512621776951-a57141f2eefd", "1467003909585-63c429911d6c",
            "1544025162-d76690b68f11", "1559339352-11d035aa65de", "1504674900247-0877df9cc836",
            "1600891964599-f61ba0e24092", "1555939594-58d7cb561ad1", "1565299507177-b0ac66763828",
            "1567337710229-bd084d543bcd", "1551218808-94e220e084d2", "1579871494447-9811cf80d66c",
            "1604382354936-07c5d9983bd3", "1550547660-d9450f859349"
        ]
        image_id = food_images[abs(name_hash) % len(food_images)]

        return {
            'name': name,
            'description': description or f"Delicious {cuisine} cuisine",
            'cuisine': cuisine,
            'latitude': float(lat),
            'longitude': float(lon),
            'address': address,
            'rating': rating,
            'delivery_time': delivery_time,
            'delivery_fee': delivery_fee,
            'is_open': True,
            'phone': phone,
            'website': website,
            'image': f"https://images.unsplash.com/photo-{image_id}?w=800&q=80"
        }
    
    def process_restaurants(self, features: List[Dict]) -> List[Dict]:
        """Process all features and extract restaurant data"""
        print("Processing restaurant data...")
        
        restaurants = []
        seen_names = set()
        valid_amenities = {'restaurant', 'fast_food', 'cafe', 'food_court', 'bar', 'pub'}
        
        for feature in features:
            properties = feature.get('properties', {})
            amenity = properties.get('amenity', '').lower()
            
            # Only process food-related amenities
            if amenity not in valid_amenities:
                continue
            
            cleaned = self.clean_restaurant(feature)
            if cleaned:
                # Avoid duplicates based on name
                name_lower = cleaned['name'].lower()
                if name_lower not in seen_names:
                    seen_names.add(name_lower)
                    restaurants.append(cleaned)
        
        print(f"✓ Processed {len(restaurants)} unique restaurants")
        return restaurants
    
    def export_json(self, restaurants: List[Dict], filename: str = "restaurants.json"):
        """Export to JSON"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(restaurants, f, indent=2, ensure_ascii=False)
            print(f"✓ Exported to {filename}")
        except Exception as e:
            print(f"✗ Error exporting JSON: {e}")
    
    def export_csv(self, restaurants: List[Dict], filename: str = "restaurants.csv"):
        """Export to CSV"""
        if not restaurants:
            print("✗ No restaurants to export")
            return
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                fieldnames = ['name', 'description', 'cuisine', 'latitude', 'longitude', 
                             'address', 'rating', 'delivery_time', 'delivery_fee', 
                             'is_open', 'phone', 'website', 'image']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                
                writer.writeheader()
                writer.writerows(restaurants)
            
            print(f"✓ Exported to {filename}")
        except Exception as e:
            print(f"✗ Error exporting CSV: {e}")
    
    def generate_sql_inserts(self, restaurants: List[Dict], filename: str = "restaurants_insert.sql"):
        """Generate SQL INSERT statements"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write("-- Restaurant data inserts from GeoJSON\n")
                f.write("-- Generated on: " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n\n")
                f.write("-- Delete existing test data (optional)\n")
                f.write("-- DELETE FROM restaurants WHERE id <= 4;\n\n")
                
                for r in restaurants:
                    # Escape single quotes
                    name = r['name'].replace("'", "''")
                    desc = r['description'].replace("'", "''")
                    cuisine = r['cuisine'].replace("'", "''")
                    address = r['address'].replace("'", "''")
                    image = r['image'].replace("'", "''")
                    
                    sql = f"""INSERT INTO restaurants (name, description, cuisine, latitude, longitude, address, rating, delivery_time, delivery_fee, is_open, image) 
VALUES ('{name}', '{desc}', '{cuisine}', {r['latitude']}, {r['longitude']}, '{address}', {r['rating']}, {r['delivery_time']}, {r['delivery_fee']}, {'true' if r['is_open'] else 'false'}, '{image}');
"""
                    f.write(sql)
            
            print(f"✓ Generated SQL inserts in {filename}")
        except Exception as e:
            print(f"✗ Error generating SQL: {e}")
    
    def run(self):
        """Main execution"""
        import time
        start_time = time.time()
        
        # Load GeoJSON
        features = self.load_geojson()
        if not features:
            print("No data loaded. Exiting.")
            return
        
        # Process data
        self.restaurants = self.process_restaurants(features)
        
        if not self.restaurants:
            print("No valid restaurants found. Exiting.")
            return
        
        # Export data
        self.export_json(self.restaurants)
        self.export_csv(self.restaurants)
        self.generate_sql_inserts(self.restaurants)
        
        elapsed = time.time() - start_time
        print(f"\n✓ Completed in {elapsed:.2f} seconds")
        print(f"📊 Total restaurants: {len(self.restaurants)}")
        
        # Print sample
        if self.restaurants:
            print("\n📋 Sample restaurant:")
            sample = self.restaurants[0]
            print(f"   Name: {sample['name']}")
            print(f"   Cuisine: {sample['cuisine']}")
            print(f"   Address: {sample['address']}")
            print(f"   Location: ({sample['latitude']}, {sample['longitude']})")


def main():
    """Main entry point"""
    import sys
    
    geojson_file = sys.argv[1] if len(sys.argv) > 1 else "export.geojson"
    
    if not os.path.exists(geojson_file):
        print(f"✗ File not found: {geojson_file}")
        print("\nUsage: python process_geojson.py <path_to_geojson>")
        print("Example: python process_geojson.py export.geojson")
        return
    
    print(f"🍽️  GeoJSON Restaurant Processor")
    print(f"━" * 50)
    print(f"Input: {geojson_file}\n")
    
    processor = GeoJSONProcessor(geojson_file)
    processor.run()
    
    print("\n" + "━" * 50)
    print("✓ Files created:")
    print("  • restaurants.json")
    print("  • restaurants.csv")
    print("  • restaurants_insert.sql")


if __name__ == "__main__":
    main()
