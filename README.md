# PHN POOLS Invoice & Estimate Renderer

Professional cloud PDF generator for PHN POOLS invoices and estimates.

Your approved logo will be embedded in the templates.

## Quick Start (after deploying to Railway)

Send a POST request to `/render` with this JSON body:

```json
{
  "type": "invoice",
  "data": {
    "title": "INVOICE #INV-20260418",
    "date": "April 18, 2026",
    "customerName": "John Doe",
    "customerAddress": "123 Pool Lane, Azusa, CA 91702",
    "items": "<tr><td>Pool Cleaning & Maintenance</td><td>1</td><td>$185</td><td>$185</td></tr><tr><td>Water Chemistry</td><td>1</td><td>$95</td><td>$95</td></tr>",
    "total": "280"
  }
}
