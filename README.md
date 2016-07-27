# Official Resy Python3 Client Library

An easy way to access the Resy API endpoints.

## Contributor

[galilgertner](https://github.com/galilg)

## Installation

Obtain the latest version of Resy Python3 library with:

    git close https://github/resy/resy_kit_python3.git

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
