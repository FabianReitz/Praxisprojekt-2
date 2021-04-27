# Collection of boolean filters and queries

Datenbank
relationale&Datenbank
relationale&Datenbank-SQL
Game&Development&iOS-Android
Game&Development&Unity-Unreal-Android-iOS
HTML&CSS-Javascript
PHP&API&Server -JavaScript
git&python
JQuery-Javascript
Javascript&HTML&CSS-Framework
Vi-Vim




curl -X POST "localhost:9200/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "user.id" : "kimchy" }
      },
      "filter": {
        "term" : { "tags" : "production" }
      },
      "must_not" : {
        "range" : {
          "age" : { "gte" : 10, "lte" : 20 }
        }
      },
      "should" : [
        { "term" : { "tags" : "env1" } },
        { "term" : { "tags" : "deployed" } }
      ],
      "minimum_should_match" : 1,
      "boost" : 1.0
    }
  }
}
'

