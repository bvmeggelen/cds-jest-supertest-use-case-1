# cds-jest-supertest-use-case-1
Example of a breaking scenario when using jest, supertest and @sap/cds@3.21.3

See tests/service.spec.js for what breaks.
However, sending the same data using Postman, works totally fine.

Using @sap/cds version 3.18.1 works just fine.
Using version 3.21.3 (or higher) breaks the test.

Incoming headers and body are the same (except for a few custom headers (prefixed with x-)).
