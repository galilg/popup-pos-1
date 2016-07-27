# Official Resy Python3 Client Library

An easy way to access the Resy API endpoints.

## Contributor

[galilgertner](https://github.com/galilg)

## Installation

Obtain the latest version of Resy Python3 library with:

    git clone https://github/resy/resy_kit_python3.git

Then, execute the following command:

    python3 setup.py install

## Usage

Start by enabling and API Key on your account.

Request API Access
------------------

Drop us an email at api@resy.com and provide us with the name of your
application and a technical contact email address and we'll create your
application and get you started.

Next, create an instance of the client using the `resy_kit.API` method:

```python
import resy_kit

resy_call = resy_kit.API(client_id)
```

This instance will allow all API calls that do not require an
OAuth access token.

All library method names match the API endpoints they access
except **/1/reservation**, which responds to multiple RESTful calls:
**DELETE**, **GET**, and **POST**.

Those methods are named for each call respectively:

- reservation_delete(resy_token)
- reservation_get()
- reservation_post(resy_token)

## Examples

### Get all cities where Resy is available.

#### Endpoint: **/1/locations**
```python
response = resy_call.locations() # returns an array
for location in response:
    print(location)
#{"full_name": "Los Angeles", "time_zone": "PST8PDT", "radius": 45, "id": '
# '"la", "location": {"latitude": 34.001212, "longitude": -118.245872}}, '
# '{"full_name": "Miami", "time_zone": "EST5EDT", "radius": 25, "id": "mia", '
# '"location": {"latitude": 25.7855893, "longitude": -80.2099657}}, '
# '{"full_name": "Aspen", "time_zone": "MST7MDT", "radius": 20, "id": "ase", '
# '"location": {"latitude": 39.1984815, "longitude": -106.8367246}}, '
# '{"full_name": "Washington D.C.", "time_zone": "EST5EDT", "radius": 50, "id": '
# '"dc", "location": {"latitude": 38.8993488, "longitude": -77.0145665}}, '
# '{"full_name": "Hamptons", "time_zone": "EST5EDT", "radius": 40, "id": "li", '
# '"location": {"latitude": 40.9690859, "longitude": -72.2123594}}, '
# '{"full_name": "New York City", "time_zone": "EST5EDT", "radius": 40, "id": '
# '"ny", "location": {"latitude": 40.7643304, "longitude": -73.9772046}}, '
# '{"full_name": "San Francisco", "time_zone": "PST8PDT", "radius": 50, "id": '
# '"sf", "location": {"latitude": 37.7577, "longitude": -122.4376}}
```

### Get the transaction ledger for the authorized application.

#### Endpoint: **/1/application/ledger**
```python
response = resy_call.application_ledger([date_start])
```


### Get the details for a specific available reservation.

#### Endpoint: **/1/application GET**
#### Format: *instance.application_get(**id, day, num_seats**)*
```python
response = resy_call.application_get(64963, '2016-07-28', 2)
#{'payment': {'buy': {'value': 'RESERVE', 'after_modifier': '', 'init': 'VIEW OPTIONS AND RESERVE', 'before_modifier': '', 'action': 'NOW'}, 'description': [], 'balance': {'value': '', 'modifier': ''}, 'details': {'service_charge': None, 'total': 0.0, 'tax': None, 'resy_fee': None}}, 'cancellation_policy': ["While you won't be charged if you need to cancel, we ask that you do so at least 24 hours in advance."], 'venue': {'location': {'address_2': None, 'state': 'NY', 'time_zone': 'EST5EDT', 'cross_street_1': 'SW corner of 27th St.', 'neighborhood': 'NoMad', 'latitude': 40.742659, 'cross_street_2': 'Park Ave South', 'postal_code': '10010', 'longitude': -73.984837, 'city': 'New York', 'address_1': '378 Park Ave South'}, 'travel_time': {'walking': 1, 'driving': 1, 'distance': 0.0}, 'about': 'A popular spot for evening cocktails or a romantic dinner, Hillstone on Park Avenue South features sushi, USDA prime steaks, entrée salads and premium sandwiches. Our California focused wine list offers premium and boutique selections a wine lover will be sure to appreciate. Located on the SW corner of Park Avenue and 27th.', 'price_range_id': 2, 'tagline': 'Architecturally thoughtful and warm, Hillstone restaurants will comfort and intrigue your senses.', 'name': 'Hillstone Park Ave', 'images': ['https://s3.amazonaws.com/resy.com/images/venues/386/1.jpg', 'https://s3.amazonaws.com/resy.com/images/venues/386/2.jpg', 'https://s3.amazonaws.com/resy.com/images/venues/386/3.jpg', 'https://s3.amazonaws.com/resy.com/images/venues/386/4.jpg'], 'type': 'American', 'contact': {'url': 'http://hillstonerestaurant.com/', 'phone_number': '2126891090'}, 'rater': {'image': 'https://s3.amazonaws.com/resy.com/images/raters/resy.png', 'scale': 5, 'score': 4.80546792849632, 'name': 'Resy'}, 'deep_link': 'resy://resy.com/VenueDetails?venue_id=386&day=2016-07-28&num_seats=2'}, 'reservation': {'features': None, 'num_seats': 2, 'seat_type': 'Dining Room', 'day': '2016-07-28', 'time_slot': '14:15:00', 'menu_items': None, 'deep_link': 'resy://resy.com/ReservationDetails?venue_id=386&table_config_id=12852&time_slot=14%3A15%3A00&day=2016-07-28&num_seats=2'}, 'double_confirmation': [], 'resy_token': 'o|i840yaRRBmxHIn7z9W9|UQPrVBS99LJOOdfUbQYIa59Lfnh0uXhiRLIdV5o8cCVBllsu9hBcTNb1zw2Tv6xA==-6eb5a6381d19f5fb168a340ac850a5c268884dabecd8b9352ebad822'}
