### This is demo application

____

#####Requirements:
 - node >=10
 - npm >=6
 
#####Install:

`npm install` 

#####Test:
`npm run test`


#####Records request body:
```
  startDate - Required. Format: YYYY-MM-DD
  endDate - Required. Format: YYYY-MM-DD
  minCount - Required. Format: number
  maxCount - Required. Format: number
```

 
 
Example:
```

curl -X POST \
  <url>/records \
  -H 'Content-Type: application/json' \
  -d '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}'

```

