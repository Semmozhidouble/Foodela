# Restaurant Data Fetcher

Fetch real restaurant data from OpenStreetMap using the Overpass API.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Fetch restaurants from Chennai (default)
```bash
python fetch_restaurants.py
```

### Fetch from a different city
```bash
python fetch_restaurants.py Mumbai India
python fetch_restaurants.py "New York" "United States"
python fetch_restaurants.py London UK
```

## Output Files

1. **restaurants.json** - JSON format with all restaurant data
2. **restaurants.csv** - CSV format for spreadsheet import
3. **restaurants_insert.sql** - SQL INSERT statements for PostgreSQL

## Data Fields

- `name` - Restaurant name
- `cuisine` - Type of cuisine (Italian, Chinese, etc.)
- `latitude` - GPS latitude
- `longitude` - GPS longitude
- `address` - Street address and city
- `rating` - Mock rating (4.0-4.9)
- `delivery_time` - Mock delivery time (20-50 minutes)
- `is_open` - Always true

## Import to Database

### Using psql
```bash
psql -U postgres -d your_database -f restaurants_insert.sql
```

### Using Supabase SQL Editor
1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `restaurants_insert.sql`
3. Click "Run"

## Example Output

```json
[
  {
    "name": "Saravana Bhavan",
    "cuisine": "Indian",
    "latitude": 13.0827,
    "longitude": 80.2707,
    "address": "T Nagar, Chennai",
    "rating": 4.5,
    "delivery_time": 25,
    "is_open": true
  }
]
```

## Notes

- Rate limited by OpenStreetMap (please be respectful)
- Results depend on OSM data completeness
- Cuisine and address fields may be incomplete for some entries
- Rating and delivery_time are mock values (customize as needed)
