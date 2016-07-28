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

This instance will allow all API calls that **do not** require an
OAuth access token.

## OAuth
--------
To access any private information a resy user allows third party access to,
an OAuth access token is required.

To access this information call the 'oauth_token' method using your client
secret and the authorization code retrieved from the the return code sent to
the redirect_uri with the 'create_authentication_url' method.

### Example:

```python
import flask
from flask import request, Response

@app.route('/')
def homepage():
    resy_call = resy_kit.API(client_id)
    redirect_uri = 'http://example.com/resy_callback'
    redirect = resy_call.create_authentication_url(redirect_uri)

    authenticate = '<a href= "%s">Authenticate User</a>'

    return authenticate % redirect

@app.route('/resy_callback')
def resy_callback():
    access_code = request.args.get

    resy_user = resy_kit.API(client_id)

    resy_user.oauth_token(client_secret, access_code)

    # Now any calls requiring an access token can be made.
```


# Resy Kit Methods
------------------

All library method names match the API endpoints they access
except **/1/reservation**, which responds to multiple RESTful calls:
**DELETE**, **GET**, and **POST**.

These methods are named for each call respectively:

- reservation_delete(resy_token)
- reservation_get(id, day, num_seats)
- reservation_post(resy_token)

**AND**

- /1/reservation/find
- /1/reservation/find/[location]

These methods are respectively called:

- reservation_find_by_lat_long(lat, long, day, num_seats)
- reservation_find_by_location(location_id, day)

To post or delete reservations a 'resy_token' is required.

resy_tokens are returned by the methods:

- reservation_get(id, day, num_seats) # For posting a new reservation
- user_reservations() # For deleting an existing reservation.

Reservation id's are returned by the two reservation_find... methods and
the venue_find method.

# Examples

## Method: **locations()**
## For endpoint: **/1/locations**
-----------------------------

### Get all cities where Resy is available.

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

## Method: **application_ledger([date_start])**
## For endpoint: **/1/application/ledger**
----------------------------------------

### Get the transaction ledger for the authorized application.

```python
response = resy_call.application_ledger([date_start])

for transaction in response:  # Returns an array.
    print(transation)

# [
#    {
#        "reservation": {
#            "day": "2015-01-01",
#            "num_seats": 2,
#            "time_slot": "19:30:00"
#        },
#        "transaction": {
#            "amount": 25.00
#            "type": "reservation"
#        },
#        "user": {
#            "email_address": "a@b.com",
#            "first_name": "Alice",
#            "last_name": "Smith",
#            "mobile_number": "+12125551212"
#        },
#        "venue": {
#            "name": "Test Venue"
#        }
#    }
#  ]
```

## Method: **reservation_delete(resy_token)**
## For endpoint: **DELETE** request on **/1/reservation**
---------------------------------------------------------

## Cancels a reservation.

```python
response = resy_call.reservation_delete("WTYxbM_YsLOcA1cTRZTOp_HHQ...")
print(response)

# One of the following responses:
# 200 Success!
# 400
# 403 Attempting to execute a payment transaction failed because of an error from the payment processor.  The message included with this error is human readable and explains why the transaction failed.
# 412 The cancellation policy for this reservation prevents it from being cancelled.
# 419
```


## Method: **reservation_get(id, day, num_seats)**
## For endpoint: **GET** request on **/1/reservation**
--------------------------------------------------

### Get the details for a specific available reservation.

```python
response = resy_call.reservation_get(64963, '2016-07-28', 2)
return jsonify(response)

#{
#    "cancellation_policy": [
#        "This reservation can be changed until Jan 1, 2015.",
#        "This reservation cannot be cancelled."
#    ],
#    "double_confirmation": [
#        "Are you sure you want to book this reservation?"
#    ],
#    "payment": {
#        "balance": {
#            "modifier": "Credit Applied",
#            "value": "$30"
#        },
#        "buy": {
#            "action": "RESERVE NOW",
#            "after_modifier": "",
#            "before_modifier": "",
#            "value": "$100 x 2 = $200"
#        },
#        "description": [
#            "$80 per person",
#            "$15 service charge",
#            "$5 taxes and fees"
#        ],
#        "details": [
#            "resy_fee": 1.23,
#            "service_charge": 4.56,
#            "tax": 7.89,
#            "total": 12.34
#        ]
#    },
#    "reservation": {
#        "day": "2015-01-01",
#        "deep_link": "resy://resy.com/ReservationDetails?venue_id=1&...",
#        "features": [
#            "Test Venue donates 100% of the proceeds from this table ..."
#        ],
#        "menu_items": [
#            "Delicious Vegan Burger",
#            "Nom nom nom, brussel sprouts!"
#        ],
#        "num_seats": 2,
#        "seat_type": "Communal",
#        "time_slot": "19:30:00",
#        "web_link": "https://resy.com/link?venue_id=1&day=2015-01-01&..."
#    },
#    "resy_token": "WTYxbM_YsLOcA1cTRZTOp_HHQh5ejxfXq7gUZ4gjqcme8mnbs...",
#    "venue": {
#        "about": "Are you ready to eat vegan? Well you better be!",
#        "contact": {
#            "phone_number": "2125551212",
#            "url": "http://resy.com/"
#        },
#        "deep_link": "resy://resy.com/VenueDetails?venue_id=1&day=20...",
#        "images": [
#            "'https://s3.amazonaws.com/resy.com/images/venues/1/1.jpg"
#        ],
#        "location": {
#            "address_1": "315 Park Avenue",
#            "address_2": null,
#            "city": "New York",
#            "cross_street_1": "23rd Street",
#            "cross_street_2": "24th Street",
#            "latitude": 40.745812,
#            "longitude": -73.9822091,
#            "neighborhood": "Flatiron",
#            "postal_code": "10016",
#            "state": "NY",
#            "time_zone": "EST5EDT"
#        },
#        "name": "Test Venue",
#        "price_range_id": 4,
#        "rater": {
#            "image": "https://s3.amazonaws.com/resy.com/images/rater...",
#            "name": "Resy",
#            "scale": 5,
#            "score": 5.0
#        },
#        "tagline": "Yummy food!",
#        "travel_time": {
#            "distance": 0.0,
#            "driving": 1,
#            "walking": 1
#        },
#        "type": "Vegan Joint",
#        "web_link": "https://resy.com/link?venue_id=1"
#    }
#  }
```

## Method: **reservation_post(resy_token)**
## For endpoint: **POST** request on **/1/reservation/**
--------------------------------------------------------

```python
response = resy_call.reservation_post("WTYxbM_YsLOcA1cTRZTOp_HHQ...")
print(response)

# One of the following responses:
#
# 201
# 400
# 402 The user does not have a payment method on file.
# 403 Attempting to execute a payment transaction failed because of an error from the payment processor.  The message included with this error is human readable and explains why the transaction failed.
# 404 The reservation has expired.
# 412 The user already has a reservation that conflicts with the one they are attempting to book.  They cannot book the new one. The response data will be formatted as follows representing the existing reservation:
#
#                  {
#                    "specs": {
#                        "day": "2015-01-01",
#                        "time_slot": "19:30:00"
#                    }
#                    "venue": {
#                        "id": 1,
#                        "name": "Test Venue"
#                    }
#                  }
```

## Method: reservation_find_by_lat_long(**lat, long, day, num_seats**)*
## For endpoint: **/1/reservation/find**
------------------------------------

### Get reservation based on search criteria.

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

## Method: reservation_find_by_location_id(**location_id, day**)
## For endpoint: **/1/reservation/find/[location]**
-----------------------------------------------

### Gets all of the available reservations based on the earch criteria in a specific Resy market.

```python
response = resy_call.reservation_find_by_location('ny', '2016-07-28')

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

## Method: **venue_find(id, provider, day, num_seats)**
## For endpoint: **/1/venue/find**
------------------------------

### Gets the resevations available for a specific venue.

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

## Method: **venue(id, provider)**
## For endpoint: **/1/venue**
-------------------------

### Gets details about a particular venue bsed on parameters.

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

## Method: **venues_top(location_id, day, num_seats)**
## For endpoint: **/1/venues/top**
------------------------------

### Gets a list of top venues based on demand data.

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



