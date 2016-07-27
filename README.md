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


