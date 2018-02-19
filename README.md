# gilded_rose

# Setup
### System Requirements
 - nodejs is installed (I said >=8.0 because that's what I've developed on, though I'm sure an earlier version will cut it
 - Probably any OS with a terminal and POSIX-compliant shell

### Startup
Setup should be as easy as:
```
git clone https://github.com/jaredhm/gilded_rose.git && cd gilded_rose
npm install
npm start
```
This ought to install all the required dependencies locally and then run the application. Once this is done, you ought to see the following printed to your terminal:
``` 
Booking app listening on port 3000!
```

# Using the API
### Querying for a booking
To query for a room assignment which will satisfy guest and luggage constraints, do
```
 GET /booking/guests/:numGuest/luggage/:storageNeeded
```
Where both `numGuests` and `storageNeeded` are integers. For example:
```
curl -XGET -w '\nCode:%{http_code}' localhost:3000/booking/guests/2/luggage/3
{
   "error" : "",
   "booking" : {
      "gold" : 0,
      "rooms" : {
         "Foo" : {
            "beds" : [
               {
                  "openLuggageSlots" : 0,
                  "guest" : {
                     "luggage" : 1
                  },
                  "name" : "A"
               }
            ]
         },
         "Baz" : {
            "beds" : [
               {
                  "name" : "A",
                  "guest" : {
                     "luggage" : 2
                  },
                  "openLuggageSlots" : 0
               }
            ]
         }
      }
   }
}
Code: 200
```
When the booking can't be satisfied, the API will respond as followings:
```
curl -XGET -w '\nCode: %{http_code}' localhost:3000/booking/guests/2/luggage/4
{
   "error" : "Could not accomodate booking"
}
Code: 404
```

### Making a booking
When the client wishes to make a booking for a set of luggage and guest constraints, do
```
POST /booking/guests/:numGuest/luggage/:storageNeeded
```
Again, both `numGuests` and `storageNeeded` are integers here. An example query:
```
curl -XPOST -w '\nCode: %{http_code}' localhost:3000/booking/guests/2/luggage/3
{
   "error" : "",
   "booking" : {
      "rooms" : {
         "Foo" : {
            "beds" : [
               {
                  "name" : "A",
                  "guest" : {
                     "luggage" : 1
                  },
                  "openLuggageSlots" : 0
               }
            ]
         },
         "Baz" : {
            "beds" : [
               {
                  "name" : "A",
                  "openLuggageSlots" : 0,
                  "guest" : {
                     "luggage" : 2
                  }
               }
            ]
         }
      },
      "gold" : 21
   }
}
Code: 200
```
When the booking can't be satisfied, the API will respond as followings:
```
curl -XPOST -w '\nCode: %{http_code}' localhost:3000/booking/guests/2/luggage/4
{
   "error" : "Could not accomodate booking"
}
Code: 404
```
### Querying for current Bookings:
The API may be queried for schedule of currently-occupied beds. Do this with
```
GET /schedule
```
An example query would be:
```
curl -XGET -w '\nCode:%{http_code}' localhost:3000/schedule
{
   "schedule" : [
      {
         "checkout" : "2018-02-20T08:00:00-05:00",
         "bed" : {
            "name" : "A",
            "guest" : {
               "luggage" : 1
            },
            "openLuggageSlots" : 0
         }
      },
      {
         "checkout" : "2018-02-20T08:00:00-05:00",
         "bed" : {
            "openLuggageSlots" : 0,
            "name" : "A",
            "guest" : {
               "luggage" : 2
            }
         }
      }
   ],
   "error" : ""
}
Code: 200
```

# Time Spent
I'd estimate that I've spent 8 to 10 hours altogether on this project so far.

Had I more time, there are several things that I'd like to see finished:
 - Scheduling and cleaning functionality actually implemented. Unfortunately, due to time constraints, I didn't get around to meeting this requirement
 - I a web setting this totally should've be done using a database as persistence, rather than using in-memory objects. Currently, this application runs the risk of race conditions, and data doesn't persist beyond the life of the applications. However, modeling data using node objects made implementing business logic much, much quicker. The silver lining is that now I have a pretty sensible schema for a DB.
 - Better documentation. This would mean a number of things:

   - Had I the time, I would first implement the API using [swagger](https://swagger.io/docs/specification/about/) so that I could properly specify the inputs and outputs of the API schema and use it to generate documentation, skeleton code, and API-level test templates.
   - Additionally, like to see something like [JSDoc](http://usejsdoc.org/) used for all function headers. This would allow me to generate documentation in all sorts of pretty formats.
  - Automated tests. There's a section about this below. I just think testing is super important, and I didn't get to do it.

# Testing
Generally, this isn't something that I allow to slip as a developer, but due to time constraints automated testing got cut.

In the future, I would implement unit and integration tests (probably using something like [mocha](https://mochajs.org/)) in order to test that functional interfaces do not change (without appropriate updates to the tests and dependent code), and that various objects continue to talk to each other in expected ways.

Additionally, using a library like [supertest](https://github.com/visionmedia/supertest) or a tool like [postman](https://www.getpostman.com/docs/postman/scripts/test_scripts), I'd want to see API-level E2E tests implemented to ensure that application-level interfaces stay correct and backwards-compatible.

If I were really feeling ambitious, I'd also encourage consumers of the API to implement consumer-based contract tests with [pact](https://docs.pact.io/).

# Online resources used
 - [The moment docs](http://momentjs.com/docs) - For interracting with the moment APIs
 - [The express docs](https://expressjs.com/en/4x/api.html) - For standing up routes, and interracting with request/response objects
 - [The priorityqueuejs docs](https://www.npmjs.com/package/priorityqueuejs) - For using the implementation of the priority queue library I used
 - [The Mozilla JS docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - For all things node. E.g. syntax stuff, standard runtime libraries, etc.
 - StackOverflow, to troubleshoot a medley of problems. Documenting them all here would be overkill, as much of the documentation for various idioms used is embedded within the code
 - The project spec, of course

# Third party tools/frameworks used
I kept dependencies to a minimum, I think. All that's needed is:
 - express - provides a nice, easy way to create a node API fast

   Chosen because I've used it before, and because of how quickly and easily you can stand up routes, and because of the request/response APIs it provides. The documentation is also pretty nice.
 - moment - really convenient set of functionality for working with dates and times

   This one I'd never heard of before today. But one look at the docs and I was sold; this library is neat and tidy and really powerful. Not to mention it introduces zero extra deps into your project
 - priorityqueuejs - implementation of a priority queue giving you callback-driven sorting. Used for optimal (I think) booking algorithm

   Again, I'd never used this. To be perfectly honest, I googled 'nodejs priority queue' and chose one which seemed to be used pretty well by the community. Really just didn't want to crack the algorithms book and reinvent the wheel.
