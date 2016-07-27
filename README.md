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

Start by enabling an API Key on your account.

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

**AND**

- /1/reservation/find
- /1/reservation/find/[location]

Those methods are called:

- reservation_find_by_lat_long(lat, long, day, num_seats)
- reservation_find_by_location(location_id, day)

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

#### Endpoint: **GET** request on **/1/application**
#### Format: *instance.application_get(**id, day, num_seats**)*
```python
response = resy_call.application_get(64963, '2016-07-28', 2)
return jsonify(response)

#{
#  "cancellation_policy": [
#    "While you won't be charged if you need to cancel, we ask that you do so at least 24 hours in advance."
#  ],
#  "double_confirmation": [],
#  "payment": {
#    "balance": {
#      "modifier": "",
#      "value": ""
#    },
#    "buy": {
#      "action": "NOW",
#      "after_modifier": "",
#      "before_modifier": "",
#      "init": "VIEW OPTIONS AND RESERVE",
#      "value": "RESERVE"
#    },
#    "description": [],
#    "details": {
#      "resy_fee": null,
#      "service_charge": null,
#      "tax": null,
#      "total": 0.0
#    }
#  },
#  "reservation": {
#    "day": "2016-07-28",
#    "deep_link": "resy://resy.com/ReservationDetails?venue_id=386&table_config_id=12852&time_slot=14%3A15%3A00&day=2016-07-28&num_seats=2",
#    "features": null,
#    "menu_items": null,
#    "num_seats": 2,
#    "seat_type": "Dining Room",
#    "time_slot": "14:15:00"
#  },
#  "resy_token": "bXjWINycvQglm3krlX_GBhjeFtpEvOqJOkMlcGqIqdJoDR AhlIARt4kRe00QZlpdygoaLlL06xMD4rM9oUNDw==-7591033adb7c5aeafb83871d1c2c13ddd27ee87bfeeb7f2214bd2107",
#  "venue": {
#    "about": "A popular spot for evening cocktails or a romantic dinner, Hillstone on Park Avenue South features sushi, USDA prime steaks, entr\u00e9e salads and premium sandwiches. Our California focused wine list offers premium and boutique selections a wine lover will be sure to appreciate. Located on the SW corner of Park Avenue and 27th.",
#    "contact": {
#      "phone_number": "2126891090",
#      "url": "http://hillstonerestaurant.com/"
#    },
#    "deep_link": "resy://resy.com/VenueDetails?venue_id=386&day=2016-07-28&num_seats=2",
#    "images": [
#      "https://s3.amazonaws.com/resy.com/images/venues/386/1.jpg",
#      "https://s3.amazonaws.com/resy.com/images/venues/386/2.jpg",
#      "https://s3.amazonaws.com/resy.com/images/venues/386/3.jpg",
#      "https://s3.amazonaws.com/resy.com/images/venues/386/4.jpg"
#    ],
#    "location": {
#      "address_1": "378 Park Ave South",
#      "address_2": null,
#      "city": "New York",
#      "cross_street_1": "SW corner of 27th St.",
#      "cross_street_2": "Park Ave South",
#      "latitude": 40.742659,
#      "longitude": -73.984837,
#      "neighborhood": "NoMad",
#      "postal_code": "10010",
#      "state": "NY",
#      "time_zone": "EST5EDT"
#    },
#    "name": "Hillstone Park Ave",
#    "price_range_id": 2,
#    "rater": {
#      "image": "https://s3.amazonaws.com/resy.com/images/raters/resy.png",
#      "name": "Resy",
#      "scale": 5,
#      "score": 4.80546792849632
#    },
#    "tagline": "Architecturally thoughtful and warm, Hillstone restaurants will comfort and intrigue your senses.",
#    "travel_time": {
#      "distance": 0.0,
#      "driving": 1,
#      "walking": 1
#    },
#    "type": "American"
#  }
#}
```


### Get reservation based on search criteria.

#### Endpoint: **/1/reservation/find**

#### Format: *instance.reservation_find_by_lat_long(**lat, long, day, num_seats**)*


```python
response = resy_call.reservation_find_by_lat_long('40.745812',
                                                  '-73.9822091',
                                                  '2016-07-28',
                                                  2)

return jsonify(response)

#  {
#    "available": [
#        {
#            "contact": {
#                "phone_number": "2125551212",
#                "url": "http://resy.com/"
#            },
#            "deep_link": "resy://resy.com/VenueDetails?venue_id=1",
#            "images": [
#                "https://s3.amazonaws.com/resy.com/images/venue/1/1.jpg"
#            ],
#            "location": {
#                "city": "New York",
#                "latitude": 40.745812,
#                "longitude": -73.9822091,
#                "neighborhood": "Flatiron",
#                "time_zone": "EST5EDT"
#            },
#            "name": "Test Venue",
#            "price_range_id": 4,
#            "reservations": [
#                {
#                    "cancellation": {
#                        "fee": {
#                            "amount": 25.00,
#                            "applies": true,
#                            "date_cut_off": "2015-01-01T12:34:56Z"
#                        },
#                    },
#                    "deep_link": "resy://resy.com/ReservationDetails...",
#                    "id": 1,
#                    "seat_type": "Communal",
#                    "time_slot": "19:30:00",
#                    "web_link": "https://resy.com/link?venue_id=1&day..."
#                }
#            ],
#            "travel_time": {
#                "distance": 0.005240127936334476,
#                "driving": 1,
#                "walking": 1
#            },
#            "type": "Vegan",
#            "web_link": "https://resy.com/link?venue_id=1"
#        }
#    ]
#  }
```

### Gets all of the available reservations based on the earch criteria in a specific Resy market.

#### Endpoint: **/1/reservation/find/[location]**
#### Format: *instance.reservation_find_by_location(**day**)*

```python
response = resy_call.reservation_find_by_location('2016-07-28')

return jsonify(response)

#  {
#    "available": [
#        {
#            "contact": {
#                "phone_number": "2125551212",
#                "url": "http://resy.com/"
#            },
#            "deep_link": "resy://resy.com/VenueDetails?venue_id=1",
#            "images": [
#                "https://s3.amazonaws.com/resy.com/images/venue/1/1.jpg"
#            ],
#            "location": {
#                "city": "New York",
#                "latitude": 40.745812,
#                "longitude": -73.9822091,
#                "neighborhood": "Flatiron",
#                "time_zone": "EST5EDT"
#            },
#            "name": "Test Venue",
#            "price_range_id": 4,
#            "reservations": [
#                {
#                    "cancellation": {
#                        "fee": {
#                            "amount": 25.00,
#                            "applies": true,
#                            "date_cut_off": "2015-01-01T12:34:56Z"
#                        },
#                    },
#                    "deep_link": "resy://resy.com/ReservationDetails...",
#                    "id": 1,
#                    "min_seats": 2,
#                    "max_seats": 4,
#                    "seat_type": "Communal",
#                    "time_slot": "19:30:00",
#                    "web_link": "https://resy.com/link?venue_id=1&day..."
#                }
#            ],
#            "travel_time": {
#                "distance": 0.005240127936334476,
#                "driving": 1,
#                "walking": 1
#            },
#            "type": "Vegan",
#            "web_link": "https://resy.com/link?venue_id=1"
#        }
#    ]
#  }
```

### Gets the resevations available for a specific venue.

#### Endpoint: **/1/venue/find**

#### Format: *instance.venue_find(**id, provider, day, num_seats**)*

**ID can be either a Foursquare ID or a Google Place ID.**
**Provider values can be 'foursquare' or 'google'.**

```python
response = resy_call.venue_find('123456789009876543211234',
                                'foursquare',
                                '2016-07-28',
                                2)

return jsonify(response)

#  {
#    "available": [
#        {
#            "contact": {
#                "phone_number": "2125551212",
#                "url": "http://resy.com/"
#            },
#            "deep_link": "resy://resy.com/VenueDetails?venue_id=1",
#            "images": [
#                "https://s3.amazonaws.com/resy.com/images/venue/1/1.jpg"
#            ],
#            "location": {
#                "city": "New York",
#                "latitude": 40.745812,
#                "longitude": -73.9822091,
#                "neighborhood": "Flatiron",
#                "time_zone": "EST5EDT"
#            },
#            "name": "Test Venue",
#            "price_range_id": 4,
#            "reservations": [
#                {
#                    "cancellation": {
#                        "fee": {
#                            "amount": 25.00,
#                            "applies": true,
#                            "date_cut_off": "2015-01-01T12:34:56Z"
#                        },
#                    },
#                    "deep_link": "resy://resy.com/ReservationDetails...",
#                    "id": 1,
#                    "seat_type": "Communal",
#                    "time_slot": "19:30:00",
#                    "web_link": "https://resy.com/link?venue_id=1&day..."
#                }
#            ],
#            "type": "Vegan",
#            "web_link": "https://resy.com/link?venue_id=1"
#        }
#    ]
#  }
```

### Gets details about a particular venue bsed on parameters.

#### Endpoint: **/1/venue**

#### Format: *instance.venue(**id, provider**)*

**ID can be either a Foursquare ID or a Google Place ID.**
**Provider values can be 'foursquare' or 'google'.**

```python
response = resy_call.venue('123456789009876543211234', 'foursquare')

return jsonify(response)

#  {
#    "contact": {
#        "phone_number": "2125551212",
#        "url": "http://resy.com/"
#    },
#    "deep_link": "resy://resy.com/VenueDetails?venue_id=1",
#    "id": 1,
#    "images": [
#        "https://s3.amazonaws.com/resy.com/images/venue/1/1.jpg"
#    ],
#    "location": {
#        "city": "New York",
#        "latitude": 40.745812,
#        "longitude": -73.9822091,
#        "neighborhood": "Flatiron",
#        "time_zone": "EST5EDT"
#    },
#    "name": "Test Venue",
#    "price_range_id": 4,
#    "type": "Vegan",
#    "web_link": "https://resy.com/link?venue_id=1"
#  }
```


### Gets a list of top venues based on demand data.

#### Endpoint: **/1/venues/top**

#### Format: *instance.venues_top(**location_id, day, num_seats**)*

```python
response = resy_call.venues_top('ny', '2016-07-28', 2) # Returns an array.

for venue in response:
    print(venue)

#  [
#    {
#        "image": "https://s3.amazonaws.com/resy.com/images/venues/1....",
#        "deep_link": "resy://resy.com/VenueDetails?venue_id=1",
#        "name": "Test Venue",
#        "price_range_id": 4,
#        "reservations": [
#            {
#                "badge": {
#                    "background_color": "ffffff",
#                    "image": "https://s3.amazonaws.com/resy.com/image..."
#                },
#                "config": {
#                    "background_color": "5DA4D0",
#                    "font_color": "FFFFFF",
#                    "type": "Communal"
#                },
#                "deep_link": "resy://resy.com/ReservationDetails?ven...",
#                "time_slot": "19:30:00"
#            }
#        ],
#        "tagline": "Yummy food!",
#        "type": "Vegan Joint"
#    }
#  ]
```

