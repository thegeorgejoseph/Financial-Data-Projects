from curses import start_color
from flask import Flask, Request
from dotenv import load_dotenv
import os
import json
import requests
app = Flask(__name__)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")
mock_ticker = "AAPL"

response = {}

@app.route("/search",methods = ['GET'])
def finnhubRouter():
    companyInfo = companyURL2API(mock_ticker)
    response["Profile"] = companyInfo
    quoteInfo = quoteAPI(mock_ticker)
    quoteInfo["Stock Ticker Symbol"] = companyInfo["Stock Ticker Symbol"]
    response["Quote"] = quoteInfo
    recommendationInfo = recommendationAPI(mock_ticker)
    response["Recommendation"] = recommendationInfo
    
    return json.dumps(response)

def companyURL2API(TICKER):
    addonString = f"stock/profile2?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL+addonString)
    res = req.json()
    companyInfo = {}
    companyInfo["logo"] = res["logo"]
    companyInfo["Company Name"] = res["name"]
    companyInfo["Stock Ticker Symbol"] = res["ticker"]
    companyInfo["Company IPO Date"] = res["exchange"]
    companyInfo["Category"] = res["finnhubIndustry"]
    
    return companyInfo


def quoteAPI(TICKER):
    addonString = f"quote?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL+addonString)
    res = req.json()
    quoteResponse = {}
    quoteResponse["Stock Ticker Symbol"] = ""
    quoteResponse["Trading Day"] = res["t"]
    quoteResponse["Previous Closing Price"] = res["pc"]
    quoteResponse["Opening Price"] = res["o"]
    quoteResponse["Opening Price"] = res["o"]
    quoteResponse["High Price"] = res["h"]
    quoteResponse["Low Price"] = res["l"]
    quoteResponse["Change"] = res["d"]
    quoteResponse["Change Percent"] = res["dp"]
    
    return quoteResponse

def recommendationAPI(TICKER):
    addonString = f"stock/recommendation?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    recommendation = {}
    recommendation["buy"] = res[0]["buy"]
    recommendation["sell"] = res[0]["sell"]
    recommendation["hold"] = res[0]["hold"]
    recommendation["strongBuy"] = res[0]["strongBuy"]
    recommendation["strongSell"] = res[0]["strongSell"]
    recommendation["IsLatest"] = res[0]["period"] > res[1]["period"]
    
    return recommendation


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=81)