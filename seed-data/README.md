# Data seeds

For now this acts as a model for the application, but functionally
this is starting data for developing the app.

The goal of these tables and their relationships is to create a dynamic model that
would work for any type of Sports/Trading Card

## Table Overviews

### brands

Simplest table at the time of writing this. Simply a list of manufacturers for
sports/trading cards.

### products

Joins to the brand table and contains list of supported products by year. Example
would be for the tops brand there is a record for 2021 baseball cards. In the example
below the brand key will match to Topps from brands table.

```json
{
  "brand": "T",
  "product": "baseball",
  "printYear": 2021,
  "series": [1, 2]
}
```
