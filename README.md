 # Introduction

List Items with filtering using query parameters 

e.g. /list/category?offset=0&limit=5&createdAt=between:2022-09-08,2022-09-09
- Using Offset and Limit 
- Using Customized Conditions code for integration with dataTables 

## Features
- List of promotion category
 - can List any table Data
 - Filter Data using query parameters e.g. offset,limit, fields exist in database
 - Custom dtConditions and ready for dataTables integration
- Retrieve promotion details
- Create a new promotion category
- Add Promotion details
- ListPromotions tree node
- Added Security only admin or user role can create new promotion category



# Conditions Code
    
    The Query parameters uses human readable text and transform to SQL query langauge
    
-  e.g. /list/category?name=contains:Top is traslated to WHERE name like '%Top%'
-  e.g. /list/category?name=starts:Top is traslated to WHERE name like 'Top%'

    | Key | Value |
    | ------ | ------ |
    | eq | = | 
    | lt | <|
    | gt | >|
    | gte | >=|
    | eq | =|
    | neq | !=|
    | between | BETWEEN|
    | notbetween | NOT BETWEEN|
    | null | IS NULL|
    | notnull | IS NOT NULL|
    | contains | %_%|
    | starts | _%|
    | ends | %_|
    

# List of Api
Swagger Ui Express 

```
    http://localhost/api/docs
```
    
# Installation

- Prerequiste: Install MySQL 5.7 
- Data from /data/hktv_all.sql 
    
## Database
- MySQL 5.7
- from config.json

    | Field | Value |
    | ------ | ------ |
    | hostname | localhost | 
    | username | hktv | 
    | password | hktv@offbeat2022 | 
    | port | 3306 | 
    | database | prod | 

-Install Packages and Run 

```
    npm i;npm start 
```