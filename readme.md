# Larticles Laravel/Vue App

> Laravel 5.5 API that uses the API resources with a Vue.js frontend

## Quick Start

### Prerequisites
Composor
Laravel
Edit environment variables in .env and create a corresponding empty database
``` bash

# Install Dependencies
composer install

# Run Migrations
php artisan migrate

# Create some dummy data
php artisan db:seed

# If you get an error about an encryption key
php artisan key:generate

# Install JS Dependencies
npm install

# Watch Files
npm run watch
```

## Endpoints

### Swagger(Open API) documentation
``` bash
api/documentation
```

### List all real world airports
``` bash
GET api/airports
(optional)order/query
```

### Get all trips
``` bash
GET api/trips
```

### Get single trip
``` bash
GET api/trip/{id}
```

### Get all flights under a trip
``` bash
GET api/trip/{id}/flights
```

### Add flight to a trip
``` bash
POST api/trip/{id}/flight
from/header
to/header
```

### Delete flight from a trip
``` bash
DELETE api/trip/{id}/{referenceID}
```
