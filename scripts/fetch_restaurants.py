"""
Fetch restaurant data from OpenStreetMap using Overpass API
Exports data to JSON and CSV formats
"""

import requests
import json
import csv
import time
from typing import List, Dict, Optional
from datetime import datetime

class RestaurantFetcher:
    def __init__(self, city: str = "Chennai", country: str = "India"):
        self.city = city
        self.country = country
        self.overpass_url = "http://overpass-api.de/api/interpreter"
        self.restaurants = []
        
    def build_query(self) -> str:
        """Build Overpass API query for restaurants in the specified city"""
        query = f"""
        [out:json][timeout:60];
        area[name="{self.city}"]->.searchArea;
        (
          node["amenity"="restaurant"](area.searchArea);
          node["amenity"="fast_food"](area.searchArea);
          node["amenity"="cafe"](area.searchArea);
          way["amenity"="restaurant"](area.searchArea);
          way["amenity"="fast_food"](area.searchArea);
          way["amenity"="cafe"](area.searchArea);
        );
        out center;
        """
        return query
    
    def fetch_data(self) -> List[Dict]:
        """Fetch restaurant data from Overpass API"""
        print(f"Fetching restaurants from {self.city}, {self.country}...")
        
        try:
            response = requests.post(
                self.overpass_url,
                data={"data": self.build_query()},
                timeout=120
            )
            response.raise_for_status()
            data = response.json()
            
            print(f"✓ Fetched {len(data.get('elements', []))} results")
            return data.get('elements', [])
            
        except requests.exceptions.RequestException as e:
            print(f"✗ Error fetching data: {e}")
            return []
    
    def clean_restaurant(self, element: Dict) -> Optional[Dict]:
        """Clean and extract relevant restaurant data"""
        tags = element.get('tags', {})
        
        # Skip if no name
        name = tags.get('name')
        if not name:
            return None
        
        # Get coordinates
        if element['type'] == 'node':
            lat = element.get('lat')
            lon = element.get('lon')
        elif element['type'] == 'way':
            center = element.get('center', {})
            lat = center.get('lat')
            lon = center.get('lon')
        else:
            return None
        
        if not lat or not lon:
            return None
        
        # Extract cuisine (clean and normalize)
        cuisine = tags.get('cuisine', 'General')
        if isinstance(cuisine, str):
            # Take first cuisine if multiple
            cuisine = cuisine.split(';')[0].split(',')[0].strip()
            cuisine = cuisine.title()
        
        # Build address
        address_parts = []
        street = tags.get('addr:street', tags.get('addr:housename', ''))
        if street:
            address_parts.append(street)
        
        city = tags.get('addr:city', self.city)
        address_parts.append(city)
        
        address = ', '.join(filter(None, address_parts))
        if not address:
            address = f"{self.city}, {self.country}"
        
        return {
            'name': name,
            'cuisine': cuisine,
            'latitude': lat,
            'longitude': lon,
            'address': address,
            'rating': round(4.0 + (hash(name) % 10) / 10, 1),  # Mock rating 4.0-4.9
            'delivery_time': 20 + (hash(name) % 30),  # Mock delivery time 20-50 min
            'is_open': True
        }
    
    def process_restaurants(self, elements: List[Dict]) -> List[Dict]:
        """Process and clean all restaurant data"""
        print("Processing restaurant data...")
        
        restaurants = []
        seen_names = set()
        
        for element in elements:
            cleaned = self.clean_restaurant(element)
            if cleaned:
                # Avoid duplicates based on name
                if cleaned['name'] not in seen_names:
                    seen_names.add(cleaned['name'])
                    restaurants.append(cleaned)
        
        print(f"✓ Processed {len(restaurants)} unique restaurants")
        return restaurants
    
    def export_json(self, restaurants: List[Dict], filename: str = "restaurants.json"):
        """Export restaurants to JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(restaurants, f, indent=2, ensure_ascii=False)
            print(f"✓ Exported to {filename}")
        except Exception as e:
            print(f"✗ Error exporting JSON: {e}")
    
    def export_csv(self, restaurants: List[Dict], filename: str = "restaurants.csv"):
        """Export restaurants to CSV file"""
        if not restaurants:
            print("✗ No restaurants to export")
            return
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                fieldnames = ['name', 'cuisine', 'latitude', 'longitude', 'address', 
                             'rating', 'delivery_time', 'is_open']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                
                writer.writeheader()
                writer.writerows(restaurants)
            
            print(f"✓ Exported to {filename}")
        except Exception as e:
            print(f"✗ Error exporting CSV: {e}")
    
    def generate_sql_inserts(self, restaurants: List[Dict], filename: str = "restaurants_insert.sql"):
        """Generate SQL INSERT statements for PostgreSQL"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write("-- Restaurant data inserts\n")
                f.write("-- Generated on: " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n\n")
                
                for r in restaurants:
                    # Escape single quotes in strings
                    name = r['name'].replace("'", "''")
                    cuisine = r['cuisine'].replace("'", "''")
                    address = r['address'].replace("'", "''")
                    
                    sql = f"""INSERT INTO restaurants (name, cuisine, latitude, longitude, address, rating, delivery_time, is_open) 
VALUES ('{name}', '{cuisine}', {r['latitude']}, {r['longitude']}, '{address}', {r['rating']}, {r['delivery_time']}, {r['is_open']});
"""
                    f.write(sql)
            
            print(f"✓ Generated SQL inserts in {filename}")
        except Exception as e:
            print(f"✗ Error generating SQL: {e}")
    
    def run(self, export_sql: bool = True):
        """Main execution flow"""
        start_time = time.time()
        
        # Fetch data
        elements = self.fetch_data()
        if not elements:
            print("No data fetched. Exiting.")
            return
        
        # Process data
        self.restaurants = self.process_restaurants(elements)
        
        if not self.restaurants:
            print("No valid restaurants found. Exiting.")
            return
        
        # Export data
        self.export_json(self.restaurants)
        self.export_csv(self.restaurants)
        
        if export_sql:
            self.generate_sql_inserts(self.restaurants)
        
        elapsed = time.time() - start_time
        print(f"\n✓ Completed in {elapsed:.2f} seconds")
        print(f"📊 Total restaurants: {len(self.restaurants)}")


def main():
    """Main entry point with configurable city"""
    import sys
    
    # Configuration
    city = sys.argv[1] if len(sys.argv) > 1 else "Chennai"
    country = sys.argv[2] if len(sys.argv) > 2 else "India"
    
    print(f"🍽️  Restaurant Data Fetcher")
    print(f"━" * 50)
    print(f"City: {city}, {country}\n")
    
    fetcher = RestaurantFetcher(city=city, country=country)
    fetcher.run(export_sql=True)
    
    print("\n" + "━" * 50)
    print("Done! Files created:")
    print("  • restaurants.json")
    print("  • restaurants.csv")
    print("  • restaurants_insert.sql")


if __name__ == "__main__":
    main()
