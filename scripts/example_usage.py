"""
Example: Using the RestaurantFetcher programmatically
"""

from fetch_restaurants import RestaurantFetcher

# Example 1: Fetch restaurants from Chennai
print("Example 1: Chennai")
fetcher1 = RestaurantFetcher(city="Chennai", country="India")
fetcher1.run()

# Example 2: Fetch from multiple cities
cities = [
    ("Mumbai", "India"),
    ("Delhi", "India"),
    ("Bangalore", "India")
]

print("\n\nExample 2: Multiple Cities")
for city, country in cities:
    print(f"\n--- Fetching {city} ---")
    fetcher = RestaurantFetcher(city=city, country=country)
    fetcher.run(export_sql=False)
    
    # Custom filenames per city
    city_name = city.lower().replace(" ", "_")
    fetcher.export_json(fetcher.restaurants, f"{city_name}_restaurants.json")
    fetcher.export_csv(fetcher.restaurants, f"{city_name}_restaurants.csv")

print("\n✓ All cities processed!")
