
# API service

#### GET healthcheck

`GET /healthcheck`

```bash
curl http://localhost:8080/healthcheck
```

**returns**

```json
{ "status": "ok" }
```

#### GET hacker-news

`GET /hacker-news`
Get the top news articles from Hacker News

```bash
curl http://localhost:8080/hacker-news
```

**returns**

```json
{
  "value": {
    "by": "xrayarx",
    "descendants": 89,
    "id": 34558087,
    "kids": [
      34561480,
      34558663
    ],
    "score": 88,
    "time": 1674918351,
    "title": "Netheads vs. bellheads redux: the strange victory of SIP over the telephone",
    "type": "story",
    "url": "https://www.devever.net/~hl/sip-victory#narrow"
}...

```